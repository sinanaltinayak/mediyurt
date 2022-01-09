import { Component, AfterViewInit, ViewChild, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Application } from 'src/app/models/application';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { map } from 'rxjs';
import { ApplicationsService } from 'src/app/services/applications.service';

import { AppModule } from 'src/app/app.module';
import { Student } from 'src/app/models/student';
import { Room } from 'src/app/models/room';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PaymentsService } from 'src/app/services/payments.service';
import { Payment } from 'src/app/models/payment';
import { StudentsService } from 'src/app/services/students.service';
import { RoomsService } from 'src/app/services/rooms.service';
import { SidebarComponent } from 'src/app/layout/sidebar/sidebar.component';
import { MediyurtService } from 'src/app/services/mediyurt.service';
import { Router } from '@angular/router';


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

  constructor(public _applicationService: ApplicationsService, public _paymentService: PaymentsService, public _studentService: StudentsService, public _roomService: RoomsService, private db: AngularFirestore, private ms: MediyurtService, private myRoute: Router) { 
    this.dataSource = new MatTableDataSource(AppModule.applicationsInfo);
    this.allApplications = AppModule.allApplications;
    this.allStudents = AppModule.allStudents;
    this.allRooms = AppModule.allRooms;

  }

  applicationID: string = "";
  roomIDList= [];

  ngAfterViewInit() {
  
    this.dataSource.sort = this.sort;
    const sortState: Sort = {active: 'dateSent', direction: 'desc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);

    this.dataSource.paginator = this.paginator;
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

  getRoomCurrentCapacity(roomId: string) {
    return this.allRooms.get(roomId).currentCapacity;
  }

  getRoomMaxCapacity(roomId: string) {
    return this.allRooms.get(roomId).maxCapacity;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async handleApproveReject(application: Application, choice: string){

    this.allApplications.forEach((app, key) => {
      if(app == application){
        this.applicationID = key;
      }
    });
    
    await this._applicationService.applicationsRef.doc(this.applicationID).update({
      status: choice, 
    });

    if(choice == 'Approved') {
      const price = this.getRoomPrice(application.appliedRoomID);
      const payment = new Payment(application.studentID, application.appliedRoomID, price, this.date, "Pending");
      await this._paymentService.create(payment);

      await this._studentService.studentsRef.doc(application.studentID).update({
        currentRoomID: application.appliedRoomID, 
      });

      const roomMaxCapacity = this.getRoomMaxCapacity(application.appliedRoomID);
      let roomCurrentCapacity = this.getRoomCurrentCapacity(application.appliedRoomID);
      
      await this._roomService.roomsRef.doc(application.appliedRoomID).update({
        currentCapacity: roomCurrentCapacity + 1, 
      });

      roomCurrentCapacity = this.getRoomCurrentCapacity(application.appliedRoomID);;
      console.log(roomMaxCapacity);
      console.log(roomCurrentCapacity);

      if (roomMaxCapacity == roomCurrentCapacity) {

        console.log("HADİ");
        await this._roomService.roomsRef.doc(application.appliedRoomID).update({
          isFull: true, 
        });
        
        this.allApplications.forEach((app, key) => {
          if(app.appliedRoomID == application.appliedRoomID){
            this.roomIDList.push(key);
          }
        });
        this.roomIDList.forEach(async (appID) => {
          if (appID != this.applicationID) {
            await this.db.collection('applications').doc(appID).update({
              status: 'Rejected', 
            });
          }
        })
      }
      
    }
    AppModule.applicationsInfo = [];
    AppModule.allApplications.clear();
    this.ms.getAllApplications();
    this.travel();
    console.log("xd")
 
  }

  travel(){
    setTimeout(() => {
      this.myRoute.navigateByUrl("/management");
    },
    150);
    this.myRoute.navigateByUrl("/loading");
  }
}