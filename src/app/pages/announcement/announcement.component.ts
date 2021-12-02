import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  title = 'Announcements';

  constructor() { }

  ngOnInit(): void {
  }

  gridColumns = 3;

  userType:string = "management";

}
