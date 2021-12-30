import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class MediyurtService {


  // bu service biraz deneme service'i gibi kullandım, her model için ayrı service açsak daha güzel olabilir

  constructor(private store: AngularFirestore) { }

  login(username: string, password: string): any{

   return this.store.collection("students", ref=>ref.where("username","==",username).where("password","==",password)).snapshotChanges();
    //  .get().subscribe(data=>
    //   data.forEach(el=>
    //     console.log(el.data()))
    // );
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
