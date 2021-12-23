import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { Room } from 'src/app/models/room';
import { RoomsComponent } from '../rooms.component';

@Component({
  selector: 'app-examine-room-dialog',
  templateUrl: './examine-room-dialog.component.html',
  styleUrls: ['./examine-room-dialog.component.css']
})
export class ExamineRoomDialogComponent implements OnInit {

  constructor(public dialog: MatDialogModule) {}

  ngOnInit(): void {
  }

  currentRoom: Room = new Room(1,"Room 4","./../assets/photos/rooms/4.jpg",3,"güzel oda",25000,1);
}
