import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Payment } from '../models/payment';
import { Room } from '../models/room';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private dbPath = '/payments';

  paymentsRef: AngularFirestoreCollection<Payment>;

  constructor(private db: AngularFirestore) {
    this.paymentsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Payment> {
    return this.paymentsRef;
  }

  delete(id: string): Promise<void> {
    return this.paymentsRef.doc(id).delete();
  }

  create(room: Payment): any {
    return this.paymentsRef.add({ ...room });
  }

  getRoom(roomId: string): AngularFirestoreDocument<Room> {
    return this.db.collection("rooms").doc(roomId);
  }

  getStudent(studentId: string): AngularFirestoreDocument<Student> {
    return this.db.collection("students").doc(studentId);
  }

}
