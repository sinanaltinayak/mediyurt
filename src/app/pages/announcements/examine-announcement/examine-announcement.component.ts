import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { Announcement } from 'src/app/models/announcement';

@Component({
  selector: 'app-examine-announcement',
  templateUrl: './examine-announcement.component.html',
  styleUrls: ['./examine-announcement.component.css']
})
export class ExamineAnnouncementComponent implements OnInit {

  constructor(public dialog: MatDialogModule) { }

  ngOnInit(): void {
  }
  
  todayDate: Date = new Date();
  content = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam soluta alias eius corrupti voluptas quae quibusdam non ipsa sed? Aspernatur placeat dolores non ipsum iste, nemo eligendi ad voluptate blanditiis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam soluta alias eius corrupti voluptas quae quibusdam non ipsa sed? Aspernatur placeat dolores non ipsum iste, nemo eligendi ad voluptate blanditiis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam soluta alias eius corrupti voluptas quae quibusdam non ipsa sed? Aspernatur placeat dolores non ipsum iste, nemo eligendi ad voluptate blanditiis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam soluta alias eius corrupti voluptas quae quibusdam non ipsa sed? Aspernatur placeat dolores non ipsum iste, nemo eligendi ad voluptate blanditiis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam soluta alias eius corrupti voluptas quae quibusdam non ipsa sed? Aspernatur placeat dolores non ipsum iste, nemo eligendi ad voluptate blanditiis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam soluta alias eius corrupti voluptas quae quibusdam non ipsa sed? Aspernatur placeat dolores non ipsum iste, nemo eligendi ad voluptate blanditiis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam soluta alias eius corrupti voluptas quae quibusdam non ipsa sed? Aspernatur placeat dolores non ipsum iste, nemo eligendi ad voluptate blanditiis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam soluta alias eius corrupti voluptas quae quibusdam non ipsa sed? Aspernatur placeat dolores non ipsum iste, nemo eligendi ad voluptate blanditiis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam soluta alias eius corrupti voluptas quae quibusdam non ipsa sed? Aspernatur placeat dolores non ipsum iste, nemo eligendi ad voluptate blanditiis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam soluta alias eius corrupti voluptas quae quibusdam non ipsa sed? Aspernatur placeat dolores non ipsum iste, nemo eligendi ad voluptate blanditiis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam soluta alias eius corrupti voluptas quae quibusdam non ipsa sed? Aspernatur placeat dolores non ipsum iste, nemo eligendi ad voluptate blanditiis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam soluta alias eius corrupti voluptas quae quibusdam non ipsa sed? Aspernatur placeat dolores non ipsum iste, nemo eligendi ad voluptate blanditiis.";
  currentAnnouncement: Announcement = new Announcement(1,"Announcement 4",this.content, this.todayDate);
}

