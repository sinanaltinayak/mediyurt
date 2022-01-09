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

// Typescript file of the announcements component, this component is for displaying the announcements page
// and it has all the necessary operations for the announcements page

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  
  // list for storing announcements
  allAnnouncements = [];
  
  // values for pagination and formatting
  gridColumns = 3;
  length = 0;
  pageSize = 6;
  pageIndex = 0;
  pageSizeOptions = [3, 6, 9, 18];
  showFirstLastButtons = true;

  // user type in order to prevent some features
  userType:string = AppModule.userType;

  title = 'Announcements';

  constructor(
    public dialog: MatDialog, 
    public _service: AnnouncementsService, 
    public myapp: AppComponent) 
  { }

  // starts on launch
  ngOnInit(): void {
    this.getAllAnnouncements();
  }

  // a function for getting all the announcements from the database and storing them
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
        
        // this is for sorting them by their date
        this.allAnnouncements.sort((a, b) => {
          return <any>new Date(b.date) - <any>new Date(a.date);
        });
        this.length = this.allAnnouncements.length;
      }); 
     
    }); 
  }

  // a function for pagination processes
  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  // a function for handling examine announcement buttons
  openExamineAnnouncementDialog(id: string) {
    // opens a dialog
    const dialogRef = this.dialog.open(ExamineAnnouncementComponent, {
      width: "50%", 
      data: {announcementId: id},
      hasBackdrop: true,
    });
  }
  
  // a function for handling add announcement button
  openAddAnnouncementDialog(): void {
    // opens a dialog
    const dialogRef = this.dialog.open(AddAnnouncementComponent, {
      width: "50%",
      hasBackdrop: true,
    });

    // if the dialog closed with the right button, it displays the necessary notification
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result==true){
        this.myapp.openSnackBar("Announcement was added.", "Close");
        this.myapp.reload("announcements",250);
      }
    });
  }
  
  // a function for handling add announcement button
  removeAnnouncement(id: string){
    this._service.delete(id);
    this.myapp.openSnackBar("Announcement deleted successfully.", "Close");
  }
}


