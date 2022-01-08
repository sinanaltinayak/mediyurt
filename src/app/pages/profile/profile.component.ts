import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { Payment } from 'src/app/models/payment';
import { Student } from 'src/app/models/student';
import { ApplicationsService } from 'src/app/services/applications.service';
import { RoomsService } from 'src/app/services/rooms.service';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentStudent = AppModule.userStudent;

  currentStudentFullName = Array.from(this.currentStudent.values())[0].fullname;
  currentStudentNumber = Array.from(this.currentStudent.values())[0].number;
  currentStudentUserName = Array.from(this.currentStudent.values())[0].username;
  currentStudentCurrentRoomID = Array.from(this.currentStudent.values())[0].currentRoomID;
  currentStudentCurrentRoomName = "";

  currentStudentPayments = new Map<string, Payment>();

  number = 1;
  hidden = false;

  constructor(private dialog: MatDialog, public _roomService: RoomsService, public _applicationService: ApplicationsService) { }

  ngOnInit(): void {
    this.getStudentRoomName();
  }


  toggleBadgeVisibility() {
    this.number = 0;
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: "50%",
      disableClose: true,
      hasBackdrop: true,
      autoFocus: false
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getStudentRoomName(){
    this._roomService.getAll().snapshotChanges().pipe(
      map(changes=> changes.map(c=>
        ({id: c.payload.doc.id, 
          name: c.payload.doc.data().name, 
        })
        
        )
      )
    ).subscribe(data => { 
      data.forEach(el=> {
        if(el.id == this.currentStudentCurrentRoomID){
          this.currentStudentCurrentRoomName = el.name;
        }
        }
      ); 
    }); 
  }
}
