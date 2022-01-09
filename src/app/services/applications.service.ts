import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { AppModule } from '../app.module';
import { Application } from '../models/application';
import { Room } from '../models/room';
import { Student } from '../models/student';
import { RoomsService } from './rooms.service';
import { StudentsService } from './students.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {


  private dbPath = '/applications';

  applicationsRef: AngularFirestoreCollection<Application>;

  constructor(private db: AngularFirestore, private _roomService: RoomsService, private _studentService: StudentsService) { 
    this.applicationsRef = db.collection(this.dbPath);
  }
  
  getAll(): AngularFirestoreCollection<Application> {
    return this.applicationsRef;
  }

  getAllApplications(){

    AppModule.applicationsInfo = [];

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
      let result = [];
      data.forEach(el=> {
        let row = ({
          id: el.id,
          type: el.type, 
          studentID: el.studentID, 
          studentName: this._studentService.getStudent(el.studentID).get().subscribe(async data => {return await data.data().fullname}),
          curentRoomID: el.currentRoomID, 
          curentRoomName: this._roomService.getRoom(el.currentRoomID).get().subscribe(async data => {return await data.data().name}),
          appliedRoomID: el.appliedRoomID, 
          appliedRoomName: this._roomService.getRoom(el.currentRoomID).get().subscribe(async data => {return await data.data().name}),
          dateSent: el.dateSent, 
          dateReturned: el.dateReturned, 
          note: el.note, 
          status: el.status});
        
        result.push(row);
        AppModule.applicationsInfo = result; 

        console.log(AppModule.applicationsInfo);
        });
    }); 
  }

  getApplication(appId: string): AngularFirestoreDocument<Application>{
    return this.applicationsRef.doc(appId);
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
