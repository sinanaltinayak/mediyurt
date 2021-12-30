import { Component } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { collection, query } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Student } from './models/student';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mediyurt';

  currentUser!:Student;
  studentList!: Student[];

  constructor (private store: AngularFirestore) { 
    
   }

  getAll(){    
    // this.store.collection('students').get().subscribe((querySnapshot) =>
    // console.log(querySnapshot.query.where("username","==","sinoş")));

    this.store.collection('students').get().subscribe((querySnapshot) => { 
    querySnapshot.forEach((doc) => {
         console.log(doc.id, "=>", doc.data());  
       })
    });

  }

  get() {
    this.store.collection('student', ref=>ref.where("fullname","==","sinan")).get().subscribe(data=>
      data.forEach(el=>
        console.log(el.data())
        ));
  }
  save(){

    this.currentUser = {
      fullname: "sinan",
      number: 64170000,
      currentRoomID: "2",
      username: "sinoş",
      password: "123"
    }

    this.store.collection('student').add(this.currentUser);
  }
}
