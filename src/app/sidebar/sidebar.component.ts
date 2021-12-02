import { Component, OnInit } from '@angular/core';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userType:string = "management";

  constructor() { }

  ngOnInit(): void {
  }

  logout(){
    
    //AppModule.globalUserID = 0;
  }
}
