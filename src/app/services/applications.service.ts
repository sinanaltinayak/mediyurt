import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Application } from '../models/application';

// service for operations about the applications table in firebase

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

  create(room: Application): any {
    return this.applicationsRef.add({ ...room });
  }

}
