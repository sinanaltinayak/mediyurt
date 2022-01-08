import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { map } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { Room } from 'src/app/models/room';
import { PaymentService } from 'src/app/services/payment.service';
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

  constructor(public dialog: MatDialogModule, @Inject(MAT_DIALOG_DATA) public data: {applicationType: string},  public _paymentService: PaymentService, public _roomService: RoomsService) { }

  ngOnInit(): void {
    this.getRoom();
    this.getPayment();
  }

  currentRoom = new Map<string, Room>();

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
        if (el.id == this.currentStudentCurrentRoomID) {
          this.currentRoom.set(el.id, new Room(el.name, el.maxCapacity, el.description, el.price, el.status, el.currentCapacity, el.isFull));
        }
        if(el.id == this.currentStudentCurrentRoomID){
          this.currentStudentCurrentRoomName = el.name;
          this.currentStudentCurrentRoomPrice = el.price;
        }
      })
    });

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
        // console.log("önce");
        // console.log(el.id);
        // console.log("sonra");
        this.paymentID = el.id;

        // if (el.roomID == this.currentStudentCurrentRoomID && el.studentID==this.currentStudent.) {
        //   this.paymentID = el.id;
        // }


      })
    });

  }

  onPay(){
    console.log("1");
    console.log(this.paymentID);
    console.log("2");
    //console.log(this.data.payment);
    console.log("3");
   // this._paymentService.delete(this.data.payment);
  }
}
