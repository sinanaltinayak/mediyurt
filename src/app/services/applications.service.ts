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
