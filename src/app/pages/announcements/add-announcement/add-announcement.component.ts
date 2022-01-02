import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Announcement } from 'src/app/models/announcement';
import { AnnouncementsService } from 'src/app/services/announcements.service';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css']
})
export class AddAnnouncementComponent implements OnInit {

  title: string = "";
  content: string = "";
  date: string = new Date().toString();

  constructor(public dialog: MatDialog, public _service: AnnouncementsService) { }

  ngOnInit(): void {
  }

  addAnnouncement(){
    let announcement = new Announcement(this.title, this.content, this.date);
    this._service.create(announcement);
  }

}
