import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Application } from '../models/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {


  private dbPath = '/applications';

  applicationsRef: AngularFirestoreCollection<Application>;

  constructor(private db: AngularFirestore) { 
    this.applicationsRef = db.collection(this.dbPath, ref => ref.orderBy('name', 'desc'));
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

}
