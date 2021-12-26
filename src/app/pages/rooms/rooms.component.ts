import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ExamineRoomDialogComponent } from './examine-room-dialog/examine-room-dialog.component';
import { EditRoomDialogComponent } from './edit-room-dialog/edit-room-dialog.component';
import { ApplicationDialogComponent } from './application-dialog/application-dialog.component';

@Component({
  selector: 'app-room',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {
  constructor(public dialog: MatDialog) {}

  title = 'Rooms';

  gridColumns = 3;

  rooms = [1,2,3,4,5,6,7];
  length = this.rooms.length;
  pageSize = 9;
  pageIndex = 0;
  pageSizeOptions = [3, 9, 18];
  showFirstLastButtons = true;

  userType:string = "student";
  haveRoom:number = 0;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  openExamineRoomDialog() {
    const dialogRef = this.dialog.open(ExamineRoomDialogComponent, {height: "70%", width: "90%"});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openEditRoomDialog() {
    const dialogRef = this.dialog.open(EditRoomDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  openApplicationDialog(appType: string) {
    const dialogRef = this.dialog.open(ApplicationDialogComponent, {
      data: { applicationType: appType },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
