import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { where } from 'firebase/firestore';
import { Application } from '../models/application';
import { Room } from '../models/room';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  private dbPath = '/applications';

  applicationsRef: AngularFirestoreCollection<Application>;

  constructor(private db: AngularFirestore) {
    this.applicationsRef = db.collection(this.dbPath, ref => ref.orderBy('date', 'desc'));
  }

  getAll(): AngularFirestoreCollection<Application> {
    return this.applicationsRef;
  }

  create(application: Application): any {
    return this.applicationsRef.add({ ...application });
  }

  delete(id: string): Promise<void> {
    return this.applicationsRef.doc(id).delete();
  }

  getRoom(roomId: string): AngularFirestoreDocument<Room> {
    return this.db.collection("rooms").doc(roomId);
  }

  getStudent(studentId: string): AngularFirestoreDocument<Student> {
    return this.db.collection("students").doc(studentId);
  }

}
