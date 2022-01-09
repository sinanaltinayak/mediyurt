import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { AppModule } from '../app.module';
import { Application } from '../models/application';
import { Room } from '../models/room';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {


  private dbPath = '/applications';

  applicationsRef: AngularFirestoreCollection<Application>;

  constructor(private db: AngularFirestore) { 
    this.applicationsRef = db.collection(this.dbPath);
  }
  
  getAll(): AngularFirestoreCollection<Application> {
    return this.applicationsRef;
  }

  
  getAllApplications(){

    AppModule.allApplications.clear();
    AppModule.applicationsInfo = [];
    let result: Application[] = [];

    this.getAll().snapshotChanges().pipe(
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
        AppModule.applicationsInfo = result; 
        });
    }); 
  }


  getApplicationByStudentID(id: string): AngularFirestoreCollection<Application>{
    return this.db.collection('rooms', ref => ref.where('studentID','==',id).where('status','==','Pending'));
  }

  delete(id: string): Promise<void> {
    return this.applicationsRef.doc(id).delete();
  }

  update(id: string, data: any): Promise<void> {
    return this.applicationsRef.doc(id).update(data);
  }

  updateApplicationStatus(id: string, data: any): Promise<void> {
    return this.db.collection('rooms', ref => ref.where('studentID','==',id).where('status','==','Pending')).doc().update(data);
  }

  create(room: Application): any {
    return this.applicationsRef.add({ ...room });
  }
  
  getRoom(roomId: string): AngularFirestoreDocument<Room> {
    return this.db.collection("rooms").doc(roomId);
  }

  getStudent(studentId: string): AngularFirestoreDocument<Student> {
    return this.db.collection("students").doc(studentId);
  }


}
