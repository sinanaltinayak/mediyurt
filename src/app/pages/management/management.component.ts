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
import { lastValueFrom } from 'rxjs';


// Typescript file of the management component, this component is for displaying the management page
// and it has all the necessary operations for the page

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementComponent implements AfterViewInit{

  // variables for holding necessary data
  allStudents = new Map<string, Student>();
  allRooms = new Map<string, Room>();
  allApplicationInfo = [];
  applicationID: string = "";
  roomIDList= [];

  // current date
  date: string = new Date().toString();

  // columns of the table
  displayedColumns: string[] = [ 'dateSent', 'type', 'studentName', 'currentRoom', 'appliedRoom', 'note', 'status'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // data source for table
  public dataSource: MatTableDataSource<any>;

  constructor(
    public _applicationService: ApplicationsService, 
    public _paymentService: PaymentsService, 
    public _studentService: StudentsService, 
    public _roomService: RoomsService, 
    private db: AngularFirestore, 
    private myapp: AppComponent
  ) {     

    // data taken from the global variables
    this.dataSource = new MatTableDataSource(AppModule.applicationsInfo);
    this.allApplicationInfo = AppModule.applicationsInfo;
    this.allStudents = AppModule.allStudents;
    this.allRooms = AppModule.allRooms;

  }

  // commands that are getting called on launch
  ngAfterViewInit() {
  
    // sorting by date in default
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

  // gets student name from their id
  getStudentName(studentId: string){
    return this.allStudents.get(studentId).fullname;
  }

  // gets room name from its id
  getRoomName(roomId: string){
    return this.allRooms.get(roomId).name;
  }

  // gets room price from its id
  getRoomPrice(roomId: string) {
    return this.allRooms.get(roomId).price;
  }

  // gets room price from its id
  getRoomCurrentCapacity(roomId: string) {
    return this.allRooms.get(roomId).currentCapacity;
  }

  // gets room maxcapacity from its id
  getRoomMaxCapacity(roomId: string) {
    return this.allRooms.get(roomId).maxCapacity;
  }

  // functoin for filtering
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // function for handling the approving or rejecting an appication
  async handleApproveReject(id: string, choice: string){

    let currentApplication: Application;

    // gets the application data from its id and stores them above
    this.allApplicationInfo.forEach(async el => {
      if(el.id == id){
        this.applicationID = el.id;
        currentApplication = await (await lastValueFrom(this._applicationService.getApplication(id).get())).data();
        console.log(currentApplication);
      }
    });
    
    // changes the status of the application
    await this._applicationService.applicationsRef.doc(this.applicationID).update({
      status: choice, 
    });

    // if the application gets approved, there are several other changes to be done
    if(choice == 'Approved') {

      // a payment is created automatically to the student
      const price = this.getRoomPrice(currentApplication.appliedRoomID);
      const payment = new Payment(currentApplication.studentID, currentApplication.appliedRoomID, price, this.date, "Pending");
      await this._paymentService.create(payment);

      // current room of the student gets changed
      await this._studentService.studentsRef.doc(currentApplication.studentID).update({
        currentRoomID: currentApplication.appliedRoomID, 
      });

      // current capacity of the room changes
      const roomMaxCapacity = this.getRoomMaxCapacity(currentApplication.appliedRoomID);
      let roomCurrentCapacity = this.getRoomCurrentCapacity(currentApplication.appliedRoomID);
    
      await this._roomService.roomsRef.doc(currentApplication.appliedRoomID).update({
        currentCapacity: roomCurrentCapacity + 1, 
      });

      // if the current capacity reaches to the max capacity, isFull value becomes true
      roomCurrentCapacity = this.getRoomCurrentCapacity(currentApplication.appliedRoomID);;
      if (roomMaxCapacity == roomCurrentCapacity) {

        await this._roomService.roomsRef.doc(currentApplication.appliedRoomID).update({
          isFull: true, 
        });

        // when the room becomes full, it automatically rejects all other pending applications that was submitted to the same room

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
      // notif display
      this.myapp.openSnackBar("Application Accepted Successfully.","Close");
    }
    else if(choice == 'Rejected'){
      // notif display
      this.myapp.openSnackBar("Application Rejected Successfully.","Close");
    }

    // page reload to get latest data
    AppModule.applicationsInfo = [];
    this.myapp.reload("management",150);
 
  }

}