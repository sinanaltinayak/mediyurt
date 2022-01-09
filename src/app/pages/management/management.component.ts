import { Component, AfterViewInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Application } from 'src/app/models/application';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ApplicationsService } from 'src/app/services/applications.service';

import { AppModule } from 'src/app/app.module';
import { Student } from 'src/app/models/student';
import { Room } from 'src/app/models/room';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PaymentsService } from 'src/app/services/payments.service';
import { Payment } from 'src/app/models/payment';
import { StudentsService } from 'src/app/services/students.service';
import { RoomsService } from 'src/app/services/rooms.service';
import { AppComponent } from 'src/app/app.component';


// Typescript file of the management component, this component is for displaying the management page
// and it has all the necessary operations for the page

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementComponent implements AfterViewInit{

  allStudents = new Map<string, Student>();
  allRooms = new Map<string, Room>();
  allApplicationInfo = [];

  date: string = new Date().toString();

  displayedColumns: string[] = [ 'dateSent', 'type', 'studentName', 'currentRoom', 'appliedRoom', 'note', 'status'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  public dataSource: MatTableDataSource<any>;

  constructor(public _applicationService: ApplicationsService, public _paymentService: PaymentsService, public _studentService: StudentsService, public _roomService: RoomsService, private db: AngularFirestore, private myapp: AppComponent) {     
    this.dataSource = new MatTableDataSource(AppModule.applicationsInfo);
    this.allApplicationInfo = AppModule.applicationsInfo;
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
    
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.dateSent.toLowerCase().includes(filter) || data.studentName.toLowerCase().includes(filter) || data.currentRoomName.toLowerCase().includes(filter)|| data.appliedRoomName.toLowerCase().includes(filter) || data.note.toString() === filter || data.status.toString() === filter;
    };
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

  async handleApproveReject(id: string, choice: string){

    let currentApplication: Application;

    this.allApplicationInfo.forEach(el => {
      if(el.id == id){
        this.applicationID = el.id;
        this._applicationService.getApplication(id).get().subscribe(async data => {currentApplication = await data.data()});
      }
    });
    
    await this._applicationService.applicationsRef.doc(this.applicationID).update({
      status: choice, 
    });

    if(choice == 'Approved') {
      const price = this.getRoomPrice(currentApplication.appliedRoomID);
      const payment = new Payment(currentApplication.studentID, currentApplication.appliedRoomID, price, this.date, "Pending");
      await this._paymentService.create(payment);

      await this._studentService.studentsRef.doc(currentApplication.studentID).update({
        currentRoomID: currentApplication.appliedRoomID, 
      });

      const roomMaxCapacity = this.getRoomMaxCapacity(currentApplication.appliedRoomID);
      let roomCurrentCapacity = this.getRoomCurrentCapacity(currentApplication.appliedRoomID);
      
      await this._roomService.roomsRef.doc(currentApplication.appliedRoomID).update({
        currentCapacity: roomCurrentCapacity + 1, 
      });

      roomCurrentCapacity = this.getRoomCurrentCapacity(currentApplication.appliedRoomID);;
      console.log(roomMaxCapacity);
      console.log(roomCurrentCapacity);

      if (roomMaxCapacity == roomCurrentCapacity) {

        await this._roomService.roomsRef.doc(currentApplication.appliedRoomID).update({
          isFull: true, 
        });

        this.allApplicationInfo.forEach(el => {
          if(el.appliedRoomID == currentApplication.appliedRoomID){
            this.roomIDList.push(el.id);
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
      
      this.myapp.openSnackBar("Application Accepted Successfully.","Close");
    }
    else if(choice == 'Rejected'){
      this.myapp.openSnackBar("Application Rejected Successfully.","Close");
    }
    AppModule.applicationsInfo = [];
    this.myapp.reload("management",150);
 
  }

}