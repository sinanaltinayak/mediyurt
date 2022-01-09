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
    console.log(AppModule.studentHasApplication);
    this.studentHasApplication = AppModule.studentHasApplication;
  }


  getDownloadURL(roomName: string){
    return this.roomImages.get(roomName);
  }

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
      data.forEach(el=> {

        this.allRooms.push({
          id: el.id,
          name: el.name,
          currentCapacity: el.currentCapacity,
          description: el.description,
          isFull: el.isFull,
          maxCapacity: el.maxCapacity,
          price: el.price,
          status: el.status,
        });
        
        this.allRooms.sort((a, b) => a.name.localeCompare(b.name));

        this.storage.storage.ref("Rooms Images/"+el.name+".jpg").getDownloadURL().then(
          (url: string) => {
            this.roomImages.set(el.name, url);
          }
        );
        this.length = this.allRooms.length;
      }); 
    }); 
  }

  getRoomStatus(roomId: string){
    this._roomService.getRoom(roomId).ref.get().then((doc) => {
      return doc.data()!.status;
      });
  }

  getCurrentCapacity(roomId: string){
    this._roomService.getRoom(roomId).ref.get().then((doc) => {
      return doc.data()!.currentCapacity;
      });
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  openExamineRoomDialog(id: string) {
    console.log("xd");
    const dialogRef = this.dialog.open(ExamineRoomDialogComponent, {
      data: {roomId: id},
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openEditRoomDialog(id: string) {
    const dialogRef = this.dialog.open(EditRoomDialogComponent, {
      width: "50%", 
      data: {
        roomId: id,
      },
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result == true){
        this.myapp.openSnackBar("Room information was updated.", "Close");
        this.myapp.reload("rooms",250);
      }
    });
  }
  
  openApplicationDialog(appType: string, id: string) {
    if(id == Array.from(this.currentStudent.values())[0].currentRoomID){
      this.myapp.openSnackBar("You cannot apply to your own room.", "Close");
    }
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
  
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        if(result == true){
          this.myapp.openSnackBar("Your application was sent.", "Close");
        }
      });
    }
    
  }

  remove(id: string){
    this._roomService.delete(id);
    this.myapp.openSnackBar("Room removed successfully.", "Close");
  }

  openAddRoomDialog(): void {
    const dialogRef = this.dialog.open(AddRoomComponent, {
      width: "50%",
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result == true){
        this.myapp.openSnackBar("New room was added.", "Close");
        this.myapp.reload("rooms",250);
      }
    });
  }

}
