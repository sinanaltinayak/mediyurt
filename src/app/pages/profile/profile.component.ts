import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { Payment } from 'src/app/models/payment';
import { Student } from 'src/app/models/student';
import { ApplicationsService } from 'src/app/services/applications.service';
import { PaymentsService } from 'src/app/services/payments.service';
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

  currentStudentPayment = [];

  paymentIsExist:number = 0;
  hidden = false;

  constructor(private dialog: MatDialog, public _roomService: RoomsService, public _paymentService: PaymentsService, public _applicationService: ApplicationsService) { }

  ngOnInit(): void {
    this.getStudentRoomName();
    this.getPaymentsofStudent(Array.from(this.currentStudent.keys())[0]);
  }


  openPaymentDialog() {
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: "50%",
      data: {
        studentName: this.currentStudentFullName,
        roomName: this.currentStudentCurrentRoomName,
        price: this.currentStudentPayment[0].price,
      },
      disableClose: true,
      hasBackdrop: true,
      autoFocus: false
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result==true){
        this.ngOnInit;
        this.paymentIsExist = 0;
      }
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

  getPaymentsofStudent(id: string){
    this._paymentService.getPaymentsofStudent(id).snapshotChanges().pipe(
      map(changes => changes.map(c=>({
        id: c.payload.doc.id,
        studentID: c.payload.doc.data().studentID,
        roomID: c.payload.doc.data().roomID,
        date: c.payload.doc.data().date,
        price: c.payload.doc.data().price,
        status: c.payload.doc.data().status,
      })))
    ).subscribe(data => {
      data.forEach(el=> {
        this.currentStudentPayment.push({
          id: el.id,
          date: el.date,
          studentID: el.studentID,
          roomID: el.roomID,
          status: el.status,
          price: el.price
        })
      });
      this.paymentIsExist = this.currentStudentPayment.length;
      console.log(this.currentStudentPayment)
    })
  }
}
