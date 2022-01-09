import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { AppModule } from '../app.module';
import { Application } from '../models/application';
import { Student } from '../models/student';
import { ApplicationsService } from './applications.service';

@Injectable({
  providedIn: 'root'
})
export class MediyurtService {


  // bu service biraz deneme service'i gibi kullandım, her model için ayrı service açsak daha güzel olabilir

  constructor(private store: AngularFirestore, private _appService: ApplicationsService) { }

  login(username: string, password: string): any{

   return this.store.collection("students", ref=>ref.where("username","==",username).where("password","==",password)).snapshotChanges();
    //  .get().subscribe(data=>
    //   data.forEach(el=>
    //     console.log(el.data()))
    // );
  }


  getAllApplications(){

    AppModule.allApplications.clear();
    AppModule.applicationsInfo = [];
    let result: Application[] =[];

    console.log("appinfo",AppModule.applicationsInfo);

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
      result = [];
      data.forEach(el=> {
        let row = new Application(el.type, el.studentID, el.currentRoomID, el.appliedRoomID, el.dateSent, el.dateReturned, el.note, el.status);
        result.push(row);
        AppModule.allApplications.set(el.id, row);
        });
    }); 
    AppModule.applicationsInfo = [];
    AppModule.applicationsInfo = result; 

  }




  getAll(){    


    this.store.collection('student').get().subscribe((querySnapshot) => { 
    querySnapshot.forEach((doc) => {
         console.log(doc.id, "=>", doc.data());  
       })
    });
  }

  get() {
    this.store.collection('student', ref=>ref.where("fullname","==","sinan")).get().subscribe(data=>data.forEach(el=>console.log(el.data())));
  }
  save(){

    let currentUser: Student;
    currentUser = {
      fullname: "sinan",
      number: 64170000,
      currentRoomID: "2",
      username: "sinoş",
      password: "123"
    }

    this.store.collection('student').add(currentUser);
  }
}
