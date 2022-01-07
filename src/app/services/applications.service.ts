import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
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

  delete(id: string): Promise<void> {
    return this.applicationsRef.doc(id).delete();
  }

  update(id: string, data: any): Promise<void> {
    return this.applicationsRef.doc(id).update(data);
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
