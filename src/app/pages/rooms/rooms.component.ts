import { Component } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {
  title = 'Rooms';

  gridColumns = 3;

  userType:string = "management";
  haveRoom:number = 1;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

}
