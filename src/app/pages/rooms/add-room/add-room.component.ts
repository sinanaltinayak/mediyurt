import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { Room } from 'src/app/models/room';
import { RoomsService } from 'src/app/services/rooms.service';
import { AngularFireStorage } from "@angular/fire/compat/storage";

// a component for the storing the content and the functions which is needed in the adding a room dialog

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

  // variables that hold the form field values and necessary data
  name: string = "";
  description: string = "";
  maxCapacity: number = 0;
  currentCapacity: number = 0;
  price: number = 0;
  status: boolean = true;
  acceptedImageFileTypes:string = ".png,.jpg";
  selectedImage!: any;
  fb!: string;
  imageName = "";
  downloadURL!: Observable<string>;
  allRoomNames: string[] = [];
  roomNameErrorMessage: string = "";

  constructor(
    public dialog: MatDialog, 
    public _roomService: RoomsService, 
    private storage: AngularFireStorage
  ) {}

  // launch commands
  ngOnInit(): void { 
    this.getAllRooms();
  }

  // gets the values of every room in the database
  getAllRooms(){
    this._roomService.getAll().snapshotChanges().pipe(
      map(changes=> changes.map(c=>({name: c.payload.doc.data().name}))))
      .subscribe(data => { data.forEach(el=> {this.allRoomNames.push(el.name);}); }); 
  }

  // adds the room to the database with the entered input
  addRoom(){
    if (this.roomNameErrorMessage == ""){
      let room = new Room(this.name, this.maxCapacity, this.description, this.price, this.status, this.currentCapacity, false);
      this._roomService.create(room);
      const file = this.selectedImage;
      const name = this.name;
      this.storage.upload('Rooms Images/'+name+'.jpg', file);
    }
  }
  
   // takes the file uploaded
  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  // checks if there is already a room with the entered name
  checkRoomName(){
    const len = this.allRoomNames.includes(this.name);
    console.log(len);
    if(len){
      this.roomNameErrorMessage = "There is already a room with this name.";
    }
    else{
      this.roomNameErrorMessage = "";
    }
  }


}
