import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Room } from '../models/room';
import { Student } from '../models/student';

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

  getRoomIDByRoomName(roomName: string): AngularFirestoreCollection<Room> {
    return this.db.collection("rooms", ref=>ref.where("name","==",roomName));
  }

  delete(id: string): Promise<void> {
    return this.roomsRef.doc(id).delete();
  }

  create(room: Room): any {
    return this.roomsRef.add({ ...room });
  }

  getRoom(roomId: string): AngularFirestoreDocument<Room> {
    return this.db.collection("rooms").doc(roomId);
  }

  getStudent(studentId: string): AngularFirestoreDocument<Student> {
    return this.db.collection("students").doc(studentId);
  }

}