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

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;

  constructor(public dialog: MatDialog, public _roomService: RoomsService, private storage: AngularFireStorage) {}

  ngOnInit(): void { }

  addRoom(){
    let room = new Room(this.name, this.maxCapacity, this.description, this.price, this.status, this.currentCapacity);
    this._roomService.create(room);

  }
  
  onFileSelected(event: any) {

    this.selectedImage = event.target.files[0];


    
    const n = this.name;
    const file = event.target.files[0];
    const filePath = 'Rooms Images/${n}';

    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Rooms Images/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
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
