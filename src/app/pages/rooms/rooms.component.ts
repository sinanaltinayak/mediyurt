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

@Component({
  selector: 'app-room',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {

  currentRoom = new Map<string, Room>();
  allRooms = new Map<string, Room>();
  roomImages = new Map<string, string>();

  currentStudent = AppModule.userStudent;
  currentManager = AppModule.userManager;
  studentRoomID = "";

  gridColumns = 3;
  length = this.allRooms.size;
  pageSize = 9;
  pageIndex = 0;
  pageSizeOptions = [3, 9, 18];
  showFirstLastButtons = true;

  left: TooltipPosition = 'left';

  userType:string = AppModule.userType;

  title = 'Rooms';

  constructor(private dialog: MatDialog, public myapp: AppComponent, public _roomService: RoomsService, public _studentService: StudentsService, private storage: AngularFireStorage) {}

  ngOnInit(): void {
    if(this.currentStudent.size != 0){
      this.studentRoomID = Array.from(this.currentStudent.values())[0].currentRoomID;
    }
    this.getAllRooms();

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
      data.forEach(el=> {
        this.allRooms.set(el.id, new Room(el.name, el.maxCapacity, el.description, el.price, el.status, el.currentCapacity, el.isFull))
        this.storage.storage.ref("Rooms Images/"+el.name+".jpg").getDownloadURL().then(
          (url: string) => {
            this.roomImages.set(el.name, url);
          }
        );
        this.length = this.allRooms.size;
      }
      ); 
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

  getRoomId(roomName: string) {
    // this._roomService.getRoomIDByRoomName(roomName).get().subscribe((ss) =>{
    //   ss.
    // });
    //return "3VlWhAwLk1upvsuKE8tE";
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  openExamineRoomDialog(id: string) {
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
        this.ngOnInit();
      }
    });
  }
}
