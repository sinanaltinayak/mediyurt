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

  // launch functions
  ngOnInit(): void {
    this.getAllApplications();
  }

  // gets all the applications from the database and stores them globally
  getAllApplications(){

    AppModule.applicationsInfo = [];
    if(AppModule.userType == "student" || AppModule.userType == "management"){
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
            status: c.payload.doc.data().status, })))).subscribe(data => { 
          let result = [];

          for(let i = 0; i< data.length; i++){
              let row = ({
                id: data[i].id,
                type: data[i].type, 
                studentID: data[i].studentID, 
                studentName: this.getStudentName(data[i].studentID),
                currentRoomID: data[i].currentRoomID, 
                currentRoomName: this.getRoomName(data[i].currentRoomID),
                appliedRoomID: data[i].appliedRoomID, 
                appliedRoomName: this.getRoomName(data[i].appliedRoomID),
                dateSent: data[i].dateSent, 
                dateReturned: data[i].dateReturned, 
                note: data[i].note, 
                status: data[i].status
            });
            if(data[i].id ==Array.from(AppModule.userStudent.keys())[0]){
              AppModule.studentHasApplication = true;
            }
            
            result.push(row);
            AppModule.applicationsInfo = result; 
          }
            });
      }
    
   
  }

  // gets the student name from their id
  getStudentName(studentId: string){
    if( AppModule.allStudents.get(studentId) != undefined){
      return AppModule.allStudents.get(studentId).fullname;
    }
    else{
      return "Student Removed";
    }
  }

  // gets the student name from its id
  getRoomName(roomId: string){
    if( AppModule.allRooms.get(roomId) != undefined){
      return AppModule.allRooms.get(roomId).name;
    }
    else{
      return "Room Removed";
    }
  }
}
