import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ExamineAnnouncementComponent } from './examine-announcement/examine-announcement.component';
import { MatDialog } from '@angular/material/dialog';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';


@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  
  announcements = [1,2,3,4,5,6,7];
  length = this.announcements.length;
  pageSize = 6;
  pageIndex = 0;
  pageSizeOptions = [3, 6, 9, 18];
  showFirstLastButtons = true;

  title = 'Announcements';

  dialogTitle!: string;
  content!: string;

  todayDate: Date = new Date();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  gridColumns = 3;

  userType:string = "management";

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  openExamineAnnouncementDialog() {
    const dialogRef = this.dialog.open(ExamineAnnouncementComponent, {width: "50%"});

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


