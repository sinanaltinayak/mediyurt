import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogModule } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { map } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { PaymentsService } from 'src/app/services/payments.service';

// a component for the storing the content and the functions which is needed in the making payment dialog

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent implements OnInit {

  // variables that hold the necessary data
  currentStudent = AppModule.userStudent;
  currentStudentFullName = Array.from(this.currentStudent.values())[0].fullname;
  currentStudentCurrentRoomID = Array.from(this.currentStudent.values())[0].currentRoomID;
  currentStudentCurrentRoomName = "";
  currentStudentCurrentRoomPrice = 0;
  paymentID = "";

  constructor(
    public dialog: MatDialogModule, 
    @Inject(MAT_DIALOG_DATA) public data: { 
      studentName: string, 
      roomName: string, 
      price: number
      }, 
    public _paymentService: PaymentsService, 
    private db: AngularFirestore
  ) { }

  // launch commands
  ngOnInit(): void {
    this.getPayment();
  }

  // gets the payment info
  getPayment(){
    this._paymentService.getAll().snapshotChanges().pipe(
      map(changes=> changes.map(c=>
        ({id: c.payload.doc.id,
          studentID: c.payload.doc.data().studentID,
          roomID: c.payload.doc.data().roomID,
          price: c.payload.doc.data().price,
          date: c.payload.doc.data().date,
          status: c.payload.doc.data().status,
        })
        )
      )
    ).subscribe(data => {
      this.paymentID = "";
      data.forEach(el=> {
        if(this.currentStudentCurrentRoomID == el.roomID) {
          this.currentStudent.forEach((student, key) => {
            if (key == el.studentID) {
              this.paymentID = el.id;
              console.log(this.paymentID);
            }
          });
        }
      })
    });

  }

}
