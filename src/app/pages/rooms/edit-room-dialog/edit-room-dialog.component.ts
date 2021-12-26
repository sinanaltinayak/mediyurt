import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { Room } from 'src/app/models/room';

@Component({
  selector: 'app-edit-room-dialog',
  templateUrl: './edit-room-dialog.component.html',
  styleUrls: ['./edit-room-dialog.component.css']
})
export class EditRoomDialogComponent implements OnInit {

  constructor(public dialog: MatDialogModule) {}

  ngOnInit(): void {
  }

  currentRoom: Room = new Room(1,"Room 4","./../assets/photos/rooms/4.jpg",3,"güzel oda",25000,1);

}
