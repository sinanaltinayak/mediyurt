import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { ApplicationsService } from 'src/app/services/applications.service';

// Typescript file of the loading component, this component is for displaying the loading page
// and it has all the necessary operations for the page

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(private _appService: ApplicationsService) { }

  ngOnInit(): void {
    this.getAllApplications();
  }

    
  getAllApplications(){

    AppModule.applicationsInfo = [];

    this._appService.getAll().snapshotChanges().pipe(
      map(changes=> changes.map(c=>
        ({id: c.payload.doc.id, 
          appliedRoomID: c.payload.doc.data().appliedRoomID,
          currentRoomID: c.payload.doc.data().currentRoomID, 
          dateSent: c.payload.doc.data().dateSent, 
          dateReturned: c.payload.doc.data().dateReturned, 
          note: c.payload.doc.data().note,
          studentID: c.payload.doc.data().studentID, 
          type: c.payload.doc.data().type, 
          status: c.payload.doc.data().status, 
        })
        )
      )
    ).subscribe(data => { 
      let result = [];
      data.forEach(el=> {
        let row = ({
          id: el.id,
          type: el.type, 
          studentID: el.studentID, 
          studentName: this.getStudentName(el.studentID),
          currentRoomID: el.currentRoomID, 
          currentRoomName: this.getRoomName(el.currentRoomID),
          appliedRoomID: el.appliedRoomID, 
          appliedRoomName: this.getRoomName(el.appliedRoomID),
          dateSent: el.dateSent, 
          dateReturned: el.dateReturned, 
          note: el.note, 
          status: el.status});
          
        if(el.id ==Array.from(AppModule.userStudent.keys())[0]){
          AppModule.studentHasApplication = true;
        }
        result.push(row);
        AppModule.applicationsInfo = result; 
        });
    }); 
  }

  
  getStudentName(studentId: string){
    if( AppModule.allStudents.get(studentId) != undefined){
      return AppModule.allStudents.get(studentId).fullname;
    }
    else{
      return "Student Removed";
    }
  }

  getRoomName(roomId: string){
    if( AppModule.allRooms.get(roomId) != undefined){
      return AppModule.allRooms.get(roomId).name;
    }
    else{
      return "Room Removed";
    }
  }
}
