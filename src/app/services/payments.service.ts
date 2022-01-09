import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Payment } from '../models/payment';
import { Room } from '../models/room';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

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

  getPaymentsofStudent(id: string): AngularFirestoreCollection<Payment> {
    return this.db.collection("payments", ref => ref.where("status","==","Pending").where("studentID","==",id));
  }

  getRoom(roomId: string): AngularFirestoreDocument<Room> {
    return this.db.collection("rooms").doc(roomId);
  }

  getStudent(studentId: string): AngularFirestoreDocument<Student> {
    return this.db.collection("students").doc(studentId);
  }

  makePayment(id: string){
    this.db.collection('payments').doc(id).update({
      status: 'Paid', 
    });
  }

}
