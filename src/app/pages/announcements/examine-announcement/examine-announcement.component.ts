import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { Announcement } from 'src/app/models/announcement';
import { AnnouncementsService } from 'src/app/services/announcements.service';

// a component for the storing the content and the functions which is needed in the examining announcement dialog

@Component({
  selector: 'app-examine-announcement',
  templateUrl: './examine-announcement.component.html',
  styleUrls: ['./examine-announcement.component.css']
})
export class ExamineAnnouncementComponent implements OnInit {

  // holds the announcement data
  currentAnnouncement = new Map<string, Announcement>();

  constructor(
    public dialog: MatDialogModule, 
    public _service: AnnouncementsService, 
    @Inject(MAT_DIALOG_DATA) public data: {announcementId: string} // data taken from the previous page (announcements)
  ) { }

  // launch functions
  ngOnInit(): void {
    this.getAnnouncement();
  }

  // function for finding the announcement data from its id
  getAnnouncement(){
    this._service.getAll().snapshotChanges().pipe(
      map(changes=> changes.map(c=>
        ({id: c.payload.doc.id, 
          title: c.payload.doc.data().title,
          content: c.payload.doc.data().content, 
          date: c.payload.doc.data().date, 
        })
        )
      )
    ).subscribe(data => { 
      data.forEach(el=> {
        if (el.id == this.data.announcementId) {
          this.currentAnnouncement.set(el.id, new Announcement(el.title, el.content, el.date));
          console.log(this.currentAnnouncement.get(this.data.announcementId)?.title);
        }
        }
      );
    });
  }
}

