import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ExamineRoomDialogComponent } from './examine-room-dialog/examine-room-dialog.component';
import { EditRoomDialogComponent } from './edit-room-dialog/edit-room-dialog.component';
import { ApplicationDialogComponent } from './application-dialog/application-dialog.component';
import { Room } from 'src/app/models/room';
import { RoomsService } from 'src/app/services/rooms.service';
import { map } from 'rxjs';
import { AddRoomComponent } from './add-room/add-room.component';

@Component({
  selector: 'app-room',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {

  currentRoom = new Map<string, Room>();
  allRooms = new Map<string, Room>();

  constructor(private dialog: MatDialog, public _service: RoomsService) {}

  ngOnInit(): void {
    this.getAll();
  }

  title = 'Rooms';

  gridColumns = 3;

  length = 0;
  pageSize = 9;
  pageIndex = 0;
  pageSizeOptions = [3, 9, 18];
  showFirstLastButtons = true;

  userType:string = "management";
  haveRoom:number = 0;

  getAll(){
    this._service.getAll().snapshotChanges().pipe(
      map(changes=> changes.map(c=>
        ({id: c.payload.doc.id, 
          currentCapacity: c.payload.doc.data().currentCapacity,
          description: c.payload.doc.data().description, 
          maxCapacity: c.payload.doc.data().maxCapacity, 
          name: c.payload.doc.data().name, 
          price: c.payload.doc.data().price, 
          status: c.payload.doc.data().status, 
          imagePath: c.payload.doc.data().imagePath, 
        })
        
        )
      )
    ).subscribe(data => { 
      data.forEach(el=> {
        this.length++;
        this.allRooms.set(el.id, new Room(el.name, el.imagePath, el.maxCapacity, el.description, el.price, el.status, el.currentCapacity))}
      ); 
    }); 
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  openExamineRoomDialog(id: string) {
    const dialogRef = this.dialog.open(ExamineRoomDialogComponent, {data: {roomId: id}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openEditRoomDialog(id: string) {
    const dialogRef = this.dialog.open(EditRoomDialogComponent, {width: "50%", data: {roomId: id}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  openApplicationDialog(appType: string) {
    const dialogRef = this.dialog.open(ApplicationDialogComponent, {
      width: "50%",
      data: { applicationType: appType },
      disableClose: true,
      hasBackdrop: false,
      autoFocus: false
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  remove(id: string){
    this._service.delete(id);
  }

  openAddRoomDialog(): void {
    const dialogRef = this.dialog.open(AddRoomComponent, {width: "50%"});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
