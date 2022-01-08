import { Component, AfterViewInit, ViewChild, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Application } from 'src/app/models/application';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs';
import { ApplicationsService } from 'src/app/services/applications.service';

import { AppModule } from 'src/app/app.module';
import { Student } from 'src/app/models/student';
import { Room } from 'src/app/models/room';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PaymentService } from 'src/app/services/payment.service';
import { Payment } from 'src/app/models/payment';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementComponent implements AfterViewInit{

  allApplications = new Map<string, Application>();
  allStudents = new Map<string, Student>();
  allRooms = new Map<string, Room>();

  date: string = new Date().toString();

  displayedColumns: string[] = [ 'dateSent', 'type', 'studentName', 'currentRoom', 'appliedRoom', 'note', 'status'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  public dataSource: MatTableDataSource<Application>;

  constructor(public _applicationService: ApplicationsService, public _paymentService: PaymentService, private db: AngularFirestore) { 
    this.dataSource = new MatTableDataSource(AppModule.applicationsInfo);
    this.allApplications = AppModule.allApplications;
    this.allStudents = AppModule.allStudents;
    this.allRooms = AppModule.allRooms;

  }

  applicationID: string = "";

  ngAfterViewInit() {
  
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getStudentName(studentId: string){
    return this.allStudents.get(studentId).fullname;
  }

  getRoomName(roomId: string){
    return this.allRooms.get(roomId).name;
  }

  getRoomPrice(roomId: string) {
    return this.allRooms.get(roomId).price;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handleApproveReject(application: Application, choice: string){

    this.allApplications.forEach((app, key) => {
      if(app == application){
        this.applicationID = key;
      }
    });
    
    this._applicationService.applicationsRef.doc(this.applicationID).update({
      status:choice, 
    });

    if(choice == 'Approved') {
      const price = this.getRoomPrice(application.appliedRoomID);
      const payment = new Payment(application.studentID, application.appliedRoomID, price, this.date, "Pending");
      this._paymentService.create(payment);
    }
 
  }

}