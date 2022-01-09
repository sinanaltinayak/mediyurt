import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

// this class contains the functions that can be used in every page

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mediyurt';


  constructor (private _snackBar: MatSnackBar, private myRoute: Router) { }


  // function for displaying a message
  openSnackBar(title: string, action: string) {
    this._snackBar.open(title, action, {
      horizontalPosition: "right",
      verticalPosition: "bottom",
      duration: 5000,
    });
  }

  // this is a function for making the user wait for some subscriptions to end
  reload(location: string, time: number){
    setTimeout(() => {
      this.myRoute.navigateByUrl("/"+location);
    },
    time);
    this.myRoute.navigateByUrl("/loading");
  }


}
