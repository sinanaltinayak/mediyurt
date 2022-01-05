import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ExamineAnnouncementComponent } from './examine-announcement/examine-announcement.component';
import { MatDialog } from '@angular/material/dialog';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { AnnouncementsService } from 'src/app/services/announcements.service';
import { map } from 'rxjs';
import { Announcement } from 'src/app/models/announcement';
import { AppModule } from 'src/app/app.module';


@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  
  currentAnnouncement = new Map<string, Announcement>();
  allAnnouncements = new Map<string, Announcement>();
  
  gridColumns = 3;
  length = 0;
  pageSize = 6;
  pageIndex = 0;
  pageSizeOptions = [3, 6, 9, 18];
  showFirstLastButtons = true;

  userType:string = AppModule.userType;

  title = 'Announcements';

  constructor(public dialog: MatDialog, public _service: AnnouncementsService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
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
        this.length++;
        this.allAnnouncements.set(el.id, new Announcement(el.title, el.content, el.date))}
      ); 
    }); 
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  openExamineAnnouncementDialog(id: string) {
    const dialogRef = this.dialog.open(ExamineAnnouncementComponent, {width: "50%", data: {announcementId: id}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddAnnouncementDialog(): void {
    const dialogRef = this.dialog.open(AddAnnouncementComponent, {width: "50%"});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}


