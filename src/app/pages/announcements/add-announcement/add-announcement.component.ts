import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css']
})
export class AddAnnouncementComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){  
    if(form.status === 'INVALID')
    {
      // display error in your form
    }else{
        console.log(form.value)
        this.dialog.closeAll(); // Close opened diaglo
      // do whatever you want to do with your data
    }
    
  }
}
