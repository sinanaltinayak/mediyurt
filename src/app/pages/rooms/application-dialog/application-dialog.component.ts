import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { Room } from 'src/app/models/room';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RoomsService } from 'src/app/services/rooms.service';
import { map } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { ApplicationsService } from 'src/app/services/applications.service';
import { Application } from 'src/app/models/application';

// a component for the storing the content and the functions which is needed in the submitting an application dialog

@Component({
  selector: 'app-application-dialog',
  templateUrl: './application-dialog.component.html',
  styleUrls: ['./application-dialog.component.css']
})
export class ApplicationDialogComponent implements OnInit {

  // variables that hold the necessary data
  currentRoom = new Map<string, Room>();
  currentStudent = AppModule.userStudent;
  currentStudentFullName = Array.from(this.currentStudent.values())[0].fullname;
  currentStudentCurrentRoomID = Array.from(this.currentStudent.values())[0].currentRoomID;
  currentStudentCurrentRoomName = "";
  note: string = "";

  // current date
  date: string = new Date().toString();

  constructor(
    public dialog: MatDialogModule, 
    public _roomService: RoomsService, 
    public _applicationService: ApplicationsService, 
    @Inject(MAT_DIALOG_DATA) public data: {
      applicationType: string, 
      roomId: string, 
      studentId: string
    }
  ) {}

  // launch commands
  ngOnInit(): void {
    this.getRoom();
  }

  // gets the room info
  getRoom(){
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
        console.log(el.id);
        console.log(this.currentStudentCurrentRoomID);
        if (el.id == this.data.roomId) {
          this.currentRoom.set(el.id, new Room(el.name, el.maxCapacity, el.description, el.price, el.status, el.currentCapacity, el.isFull));
        }
        if(el.id == this.currentStudentCurrentRoomID){
          this.currentStudentCurrentRoomName = el.name;
        }
      })
    });

  }

  // creates an application
  handleApply(){
    let application = new Application(this.data.applicationType, Array.from(this.currentStudent.keys())[0], this.currentStudentCurrentRoomID, Array.from(this.currentRoom.keys())[0], this.date, "", this.note, "Pending");
    this._applicationService.create(application);
  }

}
