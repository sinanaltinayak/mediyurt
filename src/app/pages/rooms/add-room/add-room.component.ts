import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Room } from 'src/app/models/room';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

  name: string = "";
  description: string = "";
  maxCapacity: number = 0;
  currentCapacity: number = 0;
  price: number = 0;
  status: boolean = true;
  imagePath: string = "";


  constructor(public dialog: MatDialog, public _service: RoomsService) { }

  ngOnInit(): void {
  }

  addRoom(){
    let announcement = new Room(this.name, this.imagePath, this.maxCapacity, this.description, this.price, this.status, this.currentCapacity);
    this._service.create(announcement);
  }

}
