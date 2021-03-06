import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ExamineRoomDialogComponent } from './examine-room-dialog/examine-room-dialog.component';
import { EditRoomDialogComponent } from './edit-room-dialog/edit-room-dialog.component';
import { ApplicationDialogComponent } from './application-dialog/application-dialog.component';
import { Room } from 'src/app/models/room';
import { RoomsService } from 'src/app/services/rooms.service';
import { map } from 'rxjs';
import { AddRoomComponent } from './add-room/add-room.component';
import { AppModule } from 'src/app/app.module';
import { StudentsService } from 'src/app/services/students.service';
import { AppComponent } from 'src/app/app.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { TooltipPosition } from '@angular/material/tooltip';
import { ApplicationsService } from 'src/app/services/applications.service';

// Typescript file of the rooms component, this component is for displaying the rooms page
// and it has all the necessary operations for the page

@Component({
  selector: 'app-room',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent{

  // list for storing announcements
  currentRoom = new Map<string, Room>();
  allRooms = [];
  roomImages = new Map<string, string>();
  studentHasApplication = false;
  currentStudent = AppModule.userStudent;
  currentManager = AppModule.userManager;
  studentRoomID = "";

  // values for pagination and formatting
  gridColumns = 3;
  length = this.allRooms.length;
  pageSize = 9;
  pageIndex = 0;
  pageSizeOptions = [3, 9, 18];
  showFirstLastButtons = true;
  left: TooltipPosition = 'left';

  // user type in order to prevent some features
  userType:string = AppModule.userType;

  title = 'Rooms';

  constructor(
    private dialog: MatDialog, 
    public myapp: AppComponent, 
    public _roomService: RoomsService, 
    public _studentService: StudentsService, 
    public _appService: ApplicationsService, 
    private storage: AngularFireStorage
  ) {}

  // starts on launch
  ngOnInit(): void {
    if(this.currentStudent.size != 0){
      this.studentRoomID = Array.from(this.currentStudent.values())[0].currentRoomID;
    }
    this.getAllRooms();
    this.studentHasApplication = AppModule.studentHasApplication;
  }

  // gets the url of the necessary picture
  getDownloadURL(roomName: string){
    return this.roomImages.get(roomName);
  }

  // a function for getting all the rooms from the database and storing them
  getAllRooms(){
    this._roomService.getAll().snapshotChanges().pipe(
      map(changes=> changes.map(c=>
        ({id: c.payload.doc.id, 
          currentCapacity: c.payload.doc.data().currentCapacity,
          description: c.payload.doc.data().description, 
          maxCapacity: c.payload.doc.data().maxCapacity, 
          name: c.payload.doc.data().name, 
          price: c.payload.doc.data().price, 
          status: c.payload.doc.data().status, 
          isFull: c.payload.doc.data().isFull, 
        })
        
        )
      )
    ).subscribe(data => { 
      this.allRooms = [];

      for (let i = 0; i < data.length; i++) {
        
        this.allRooms.push({
          id: data[i].id,
          name: data[i].name,
          currentCapacity: data[i].currentCapacity,
          description: data[i].description,
          isFull: data[i].isFull,
          maxCapacity: data[i].maxCapacity,
          price: data[i].price,
          status: data[i].status,
        });
        
        this.allRooms.sort((a, b) => a.name.localeCompare(b.name));

        this.storage.storage.ref("Rooms Images/"+data[i].name+".jpg").getDownloadURL().then(
          (url: string) => {
            this.roomImages.set(data[i].name, url);
          }
        );
        this.length = this.allRooms.length;

        
      }
    }); 
  }

  // gets room status from its id
  getRoomStatus(roomId: string){
    this._roomService.getRoom(roomId).ref.get().then((doc) => {
      return doc.data()!.status;
      });
  }

  // gets room currentcapacity from its id
  getCurrentCapacity(roomId: string){
    this._roomService.getRoom(roomId).ref.get().then((doc) => {
      return doc.data()!.currentCapacity;
      });
  }

  // a function for pagination processes
  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  // a function for handling examine room buttons
  openExamineRoomDialog(id: string) {
    // opens a dialog
    const dialogRef = this.dialog.open(ExamineRoomDialogComponent, {
      data: {roomId: id},
      hasBackdrop: true,
    });
  }

  // a function for handling edit room buttons
  openEditRoomDialog(id: string) {
    // opens a dialog
    const dialogRef = this.dialog.open(EditRoomDialogComponent, {
      width: "50%", 
      data: {
        roomId: id,
      },
      hasBackdrop: true,
    });

    // if the dialog gets closed with the right button, it displays the necessary notification
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result == true){
        this.myapp.openSnackBar("Room information was updated.", "Close");
        this.myapp.reload("rooms",250);
      }
    });
  }
  
  // a function for handling apply room buttons
  openApplicationDialog(appType: string, id: string) {
    // checks if the applied room is the student's current room
    if(id == Array.from(this.currentStudent.values())[0].currentRoomID){
      this.myapp.openSnackBar("You cannot apply to your own room.", "Close");
    }
    // if not it opens a dialog
    else{
      const dialogRef = this.dialog.open(ApplicationDialogComponent, {
        width: "50%",
        data: { applicationType: appType,
                roomId: id,
                studentId: Array.from(this.currentStudent.keys())[0],
                 },
        disableClose: true,
        hasBackdrop: true,
        autoFocus: false
      });
  
    // if the dialog gets closed with the right button, it displays the necessary notification
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        if(result == true){
          this.myapp.openSnackBar("Your application was sent.", "Close");
          this.myapp.reload("rooms",250);
        }
      });
    }
    
  }

  // function for removing rooms
  remove(id: string){
    this._roomService.delete(id);
    this.myapp.openSnackBar("Room removed successfully.", "Close");
  }

  // a function for handling add room button
  openAddRoomDialog(): void {
    // if not it opens a dialog
    const dialogRef = this.dialog.open(AddRoomComponent, {
      width: "50%",
      hasBackdrop: true,
    });

    // if the dialog gets closed with the right button, it displays the necessary notification
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result == true){
        this.myapp.openSnackBar("New room was added.", "Close");
        this.myapp.reload("rooms",250);
      }
    });
  }

}
