import { Component } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-room',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {
  title = 'Rooms';

  gridColumns = 3;

  rooms = [1,2,3,4,5,6,7];
  length = this.rooms.length;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  userType:string = "student";
  haveRoom:number = 1;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

}
