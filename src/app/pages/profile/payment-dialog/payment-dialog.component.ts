import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogModule } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { map } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { Room } from 'src/app/models/room';
import { PaymentsService } from 'src/app/services/payments.service';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent implements OnInit {

  //currentRoom = new Map<string, Room>();
  currentStudent = AppModule.userStudent;

  currentStudentFullName = Array.from(this.currentStudent.values())[0].fullname;
  currentStudentCurrentRoomID = Array.from(this.currentStudent.values())[0].currentRoomID;
  currentStudentCurrentRoomName = "";
  currentStudentCurrentRoomPrice = 0;

  paymentID = "";

  constructor(public dialog: MatDialogModule, @Inject(MAT_DIALOG_DATA) public data: { studentName: string, roomName: string, price: number},  public _paymentService: PaymentsService, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.getPayment();
  }

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
      console.log("DENEME");
      data.forEach(el=> {
        if(this.currentStudentCurrentRoomID == el.roomID) {
          this.currentStudent.forEach((student, key) => {
            if (key == el.studentID) {
              this.paymentID = el.id;
            }
          });
        }
      })
    });

  }

  onPay(){
    this._paymentService.makePayment(this.paymentID);
  }
}
