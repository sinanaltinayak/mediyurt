import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { Room } from 'src/app/models/room';
import { RoomsService } from 'src/app/services/rooms.service';
import { RoomsComponent } from '../rooms.component';

@Component({
  selector: 'app-examine-room-dialog',
  templateUrl: './examine-room-dialog.component.html',
  styleUrls: ['./examine-room-dialog.component.css']
})
export class ExamineRoomDialogComponent implements OnInit {

  currentRoom = new Map<string, Room>();
  roomImages = new Map<string, string>();

  constructor(public dialog: MatDialogModule, public _service: RoomsService, @Inject(MAT_DIALOG_DATA) public data: {roomId: string}, private storage: AngularFireStorage) {}

  ngOnInit(): void {
    this.getRoom();
    this.getAllRooms();
  }

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
          isFull: c.payload.doc.data().isFull, 
        })
        
        )
      )
    ).subscribe(data => { 
      data.forEach(el=> {
        if (el.id == this.data.roomId) {
          this.currentRoom.set(el.id, new Room(el.name, el.maxCapacity, el.description, el.price, el.status, el.currentCapacity, el.isFull));
        }
        }
      );
    });
  }


  getAllRooms(){
    this._service.getAll().snapshotChanges().pipe(
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
        this.storage.storage.ref("Rooms Images/"+el.name+".jpg").getDownloadURL().then(
          (url: string) => {
            this.roomImages.set(el.name, url);
          }
        );
      }
      ); 
    }); 
  }
  
  getDownloadURL(roomName: string){
    return this.roomImages.get(roomName);
  }
}
