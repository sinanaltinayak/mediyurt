import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ExamineAnnouncementComponent } from './examine-announcement/examine-announcement.component';
import { MatDialog } from '@angular/material/dialog';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { AnnouncementsService } from 'src/app/services/announcements.service';
import { map } from 'rxjs';
import { Announcement } from 'src/app/models/announcement';
import { AppModule } from 'src/app/app.module';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  
  currentAnnouncement = new Map<string, Announcement>();
  allAnnouncements = [];
  
  gridColumns = 3;
  length = 0;
  pageSize = 6;
  pageIndex = 0;
  pageSizeOptions = [3, 6, 9, 18];
  showFirstLastButtons = true;

  userType:string = AppModule.userType;

  title = 'Announcements';

  constructor(public dialog: MatDialog, public _service: AnnouncementsService, public myapp: AppComponent) { }

  ngOnInit(): void {
    this.getAllAnnouncements();
  }

  getAllAnnouncements(){
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
      this.allAnnouncements = [];
      data.forEach(el=> {

        this.allAnnouncements.push({
          id: el.id,
          title: el.title,
          content: el.content,
          date: el.date,
        });
        
        this.allAnnouncements.sort((a, b) => {
          return <any>new Date(b.date) - <any>new Date(a.date);
        });
        this.length = this.allAnnouncements.length;
      }); 
     
    }); 
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  openExamineAnnouncementDialog(id: string) {
    const dialogRef = this.dialog.open(ExamineAnnouncementComponent, {
      width: "50%", 
      data: {announcementId: id},
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddAnnouncementDialog(): void {
    const dialogRef = this.dialog.open(AddAnnouncementComponent, {
      width: "50%",
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result==true){
        this.myapp.openSnackBar("Announcement was added.", "Close");
        this.myapp.reload("announcements",250);
      }
    });
  }
  
  removeAnnouncement(id: string){
    this._service.delete(id);
    this.myapp.openSnackBar("Announcement deleted successfully.", "Close");
  }
}


