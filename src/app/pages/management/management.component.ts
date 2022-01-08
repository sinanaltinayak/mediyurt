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

  constructor(public _service: ApplicationsService, private db: AngularFirestore) { 
    this.dataSource = new MatTableDataSource(AppModule.applicationsInfo);
    this.allApplications = AppModule.allApplications;
    this.allStudents = AppModule.allStudents;
    this.allRooms = AppModule.allRooms;

  }

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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // handleApproveReject(id: string, choice: string){
  
  //   let app = Array.from(this.allApplications.values()).find(el => el.studentID == id)
  //   this._service.updateApplicationStatus(app.studentID, new Application(app.type, app.studentID, app.currentRoomID, app.appliedRoomID, app.dateSent, app.dateReturned, app.note, choice));
        
   
  // }

  handleApproveReject(id: string, choice: string){
    
    const tutorialsRef = this.db.collection('applications', ref => ref.where('studentID', '==', id));
    tutorialsRef.doc().update({
      status:choice, 
    });
 
  }

}