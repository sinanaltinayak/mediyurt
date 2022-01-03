import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private dbPath = '/rooms';

  roomsRef: AngularFirestoreCollection<Room>;

  constructor(private db: AngularFirestore) {
    this.roomsRef = db.collection(this.dbPath, ref => ref.orderBy('name', 'desc'));
  }

  getAll(): AngularFirestoreCollection<Room> {
    return this.roomsRef;
  }

  delete(id: string): Promise<void> {
    return this.roomsRef.doc(id).delete();
  }

  update(id: string, data: any): Promise<void> {
    return this.roomsRef.doc(id).update(data);
  }

  create(room: Room): any {
    return this.roomsRef.add({ ...room });
  }

}
