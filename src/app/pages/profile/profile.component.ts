import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { ApplicationsService } from 'src/app/services/applications.service';
import { PaymentsService } from 'src/app/services/payments.service';
import { RoomsService } from 'src/app/services/rooms.service';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';

// Typescript file of the profile component, this component is for displaying the profile page
// and it has all the necessary operations for the page

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // variables for holding necessary data
  currentStudent = AppModule.userStudent;
  currentStudentFullName = Array.from(this.currentStudent.values())[0].fullname;
  currentStudentNumber = Array.from(this.currentStudent.values())[0].number;
  currentStudentUserName = Array.from(this.currentStudent.values())[0].username;
  currentStudentCurrentRoomID = Array.from(this.currentStudent.values())[0].currentRoomID;
  currentStudentCurrentRoomName = "";
  currentStudentPayment;
  paymentIsExist:number = 0;
  hidden = false;

  constructor(
    private dialog: MatDialog, 
    public _roomService: RoomsService, 
    public _paymentService: PaymentsService, 
    public _applicationService: ApplicationsService
  ) { }

  // commands that are getting called on launch
  ngOnInit(): void {
    this.getStudentRoomName();
    this.getPaymentofStudent(Array.from(this.currentStudent.keys())[0]);
  }

  // a function for handling payment button
  openPaymentDialog() {
    // opens a dialog
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: "50%",
      data: {
        studentName: this.currentStudentFullName,
        roomName: this.currentStudentCurrentRoomName,
        price: this.currentStudentPayment.price,
      },
      hasBackdrop: true,
      autoFocus: false
    });


    // if the dialog closed with the right button, it makes the payment and displays the necessary notification
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result==true){
        this.onPay(this.currentStudentPayment.id);
        this.paymentIsExist = 0;
        this.currentStudentPayment = {};
      }
    });
  }

  // gets the room name of the student
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

  // checks if the student has a pending payment or not
  getPaymentofStudent(id: string){
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
      this.currentStudentPayment = {};
      data.forEach(el=> {
        this.currentStudentPayment = {
          id: el.id,
          date: el.date,
          studentID: el.studentID,
          roomID: el.roomID,
          status: el.status,
          price: el.price
        }
        this.paymentIsExist = 1;
      });
    })
  }

  // makes the payment by changing the status of the necessary payment to 'Paid'
  onPay(id: string){
    this._paymentService.makePayment(id);
  }
}
