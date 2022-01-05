import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Room } from 'src/app/models/room';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent implements OnInit {

  constructor(public dialog: MatDialogModule, @Inject(MAT_DIALOG_DATA) public data: {applicationType: string}) { }

  ngOnInit(): void {
  }

  currentStudent: Student = new Student("Sinan Altınayak",64170004,"2","sinoş","123");
  currentRoom: Room = new Room("Room 4",3,"güzel oda",25000,true, 0);

}
