import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { Room } from 'src/app/models/room';
import { RoomsService } from 'src/app/services/rooms.service';

// a component for the storing the content and the functions which is needed in the editing room dialog

@Component({
  selector: 'app-edit-room-dialog',
  templateUrl: './edit-room-dialog.component.html',
  styleUrls: ['./edit-room-dialog.component.css']
})
export class EditRoomDialogComponent implements OnInit {

  // variables that hold the necessary data
  currentRoom = new Map<string, Room>();
  name: string = "";
  description: string = "";
  maxCapacity: number = 0;
  price: number = 0;

  // values for formatting
  acceptedImageFileTypes:string = ".png,.jpg";
  selectedImage!: any;

  constructor(
    private storage: AngularFireStorage, 
    public dialog: MatDialogModule, 
    public _service: RoomsService,
    @Inject(MAT_DIALOG_DATA) public data: {
      roomId: string
    }
  ) {}

  // starts on launch
  ngOnInit(): void {
    this.getRoom();
  }

  // gets the values of the current room
  getRoom(){
    this._service.getAll().snapshotChanges().pipe(
      map(changes=> changes.map(c=>
        ({id: c.payload.doc.id, 
          currentCapacity: c.payload.doc.data().currentCapacity,
          description: c.payload.doc.data().description, 
          maxCapacity: c.payload.doc.data().maxCapacity, 
          name: c.payload.doc.data().name, 
          price: c.payload.doc.data().price, 
          status: c.payload.doc.data().status, 
        })
        
        )
      )
    ).subscribe(data => { 
      data.forEach(el=> {
        if (el.id == this.data.roomId) {
          this.currentRoom.set(el.id, new Room(el.name, el.maxCapacity, el.description, el.price, el.status, el.currentCapacity, false));
        }
        }
      );
    });
  }

  // updates the values of the room
  updateDoc(_name: any, _maxCapacity: any, _price: any, _description: any) {

    // if a formfield is empty, it is not changed
    if(_name == "") {
      _name = this.currentRoom.get(this.data.roomId)?.name;
    }
    if(_maxCapacity == 0) {
      _maxCapacity = this.currentRoom.get(this.data.roomId)?.maxCapacity;
    }
    if(_price == 0) {
      _price = this.currentRoom.get(this.data.roomId)?.price;
    }
    if(_description == "") {
      _description = this.currentRoom.get(this.data.roomId)?.description;
    }
    if(this.selectedImage){
      const file = this.selectedImage;
      this.storage.upload('Rooms Images/'+_name+'.jpg', file);
    }
    
    this._service.roomsRef.doc(this.data.roomId).update({name:_name, description: _description, maxCapacity: _maxCapacity, price: _price });
   }
   
   // takes the file uploaded
  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }
}
