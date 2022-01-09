import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Announcement } from 'src/app/models/announcement';
import { AnnouncementsService } from 'src/app/services/announcements.service';

// a component for the storing the content and the functions which is needed in the adding announcement dialog

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css']
})
export class AddAnnouncementComponent {

  // variables that hold the form field values
  title: string = "";
  content: string = "";

  // gets the current date
  date: string = new Date().toString();

  constructor(public dialog: MatDialog, public _service: AnnouncementsService) { }

  // adds announcement to the database
  addAnnouncement(){
    let announcement = new Announcement(this.title, this.content, this.date);
    this._service.create(announcement);
  }

}
