import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  number = 1;

  hidden = false;

  toggleBadgeVisibility() {
    this.number = 0;
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: "50%",
      disableClose: true,
      hasBackdrop: false,
      autoFocus: false
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
