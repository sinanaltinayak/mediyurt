import { MaxSizeValidator } from '@angular-material-components/file-input';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { finalize, map, Observable } from 'rxjs';
import { Room } from 'src/app/models/room';
import { RoomsService } from 'src/app/services/rooms.service';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { FileUpload } from '../../../models/file-upload';
import { AngularFireDatabase } from '@angular/fire/compat/database';

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
  
  acceptedImageFileTypes:string = ".png,.jpg";
  selectedImage!: any;
  fb!: string;
  imageName = "";
  downloadURL!: Observable<string>;
  url!: Observable<string | null>;

  allRoomNames: string[] = [];
  roomNameErrorMessage: string = "";

  constructor(public dialog: MatDialog, public _roomService: RoomsService, private storage: AngularFireStorage, private db: AngularFireDatabase) {}

  ngOnInit(): void { 
    this.getAllRooms();
  }

  getAllRooms(){
    this._roomService.getAll().snapshotChanges().pipe(
      map(changes=> changes.map(c=>({name: c.payload.doc.data().name}))))
      .subscribe(data => { data.forEach(el=> {this.allRoomNames.push(el.name);}); }); 
  }

  addRoom(){
    if (this.roomNameErrorMessage != ""){
      let room = new Room(this.name, this.maxCapacity, this.description, this.price, this.status, this.currentCapacity, false);
      this._roomService.create(room);
  
      const metaData = {"contentType": this.selectedImage.type};
      const storageRef = this.storage.storage.ref('Rooms Images/${this.name}.jpg');
      storageRef.put(this.selectedImage, metaData);
      console.log("Uploading: ", this.selectedImage.name);
  
      
      const file = this.selectedImage;
      const name = this.name;
      const task = this.storage.upload('Rooms Images/'+name+'.jpg', file);
    }
  }
  
  onFileSelected(event: any) {

    this.selectedImage = event.target.files[0];

  }

  checkRoomName(){
    // const len = this.allRoomNames.find(element => element = this.name);
    // console.log(len);
    // if(len!.length > 0){
    //   this.roomNameErrorMessage = "There is already a room with this name.";
    // }
    // else{
    //   this.roomNameErrorMessage = "";
    // }
  }

  getRoomID(roomName: string){
    this._roomService.getRoomIDByRoomName(roomName).snapshotChanges().pipe(map(changes=> changes.map(c=>
      ({id: c.payload.doc.id })
      )
    )
  ).subscribe(data => { 
    if(data.length != 0){ 
      this.imageName = data[0].id;
     }
  });
  }

}
