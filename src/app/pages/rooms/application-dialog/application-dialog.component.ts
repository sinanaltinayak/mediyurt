import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { Room } from 'src/app/models/room';
import { Student } from 'src/app/models/student';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-application-dialog',
  templateUrl: './application-dialog.component.html',
  styleUrls: ['./application-dialog.component.css']
})
export class ApplicationDialogComponent implements OnInit {

  constructor(public dialog: MatDialogModule, @Inject(MAT_DIALOG_DATA) public data: {applicationType: string}) {}

  ngOnInit(): void {
  }

  currentStudent: Student = new Student("Sinan Altınayak",64170004,"2","sinoş","123");
  currentRoom: Room = new Room("Room 4","./../assets/photos/rooms/4.jpg",3,"güzel oda",25000,true, 0);

}
