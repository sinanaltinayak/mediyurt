import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { collection, query, doc, deleteDoc } from 'firebase/firestore';
import { flatMap, map, Observable } from 'rxjs';
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

    this.store.collection('students').add(this.currentUser);
  }

  delete() {
    this.store.collection('students', ref=>ref.where("username","==","sinoş")).get().subscribe(data=>data.forEach(function(doc) {
      doc.ref.delete();
    }));
  }

  updateDoc(_username: string, _value: string) {
    let doc = this.store.collection<Student>('students', ref => ref.where('username', '==', _username));
    doc.snapshotChanges().pipe(
      map(actions => actions.map(a => {                                                      
        const data = a.payload.doc.data() as Student;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))).subscribe((_doc: any) => {
       let id = _doc[0].payload.doc.id; //first result of query [0]
       this.store.doc(`students/${id}`).update({username: _value});
      })
  }

}
