import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Manager } from '../models/manager';
import { Student } from '../models/student';

// service for operations about the students table in firebase

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private dbPath = '/students';

  studentsRef: AngularFirestoreCollection<Student>;

  constructor(private db: AngularFirestore) {
    this.studentsRef = db.collection(this.dbPath);
  }

  // finds the student with the provided username and password
  loginStudent(username: string, password: string): AngularFirestoreCollection<Student>{
    return this.db.collection("students", ref=>ref.where("username","==",username).where("password","==",password));
   }  
   
  // finds the manager with the provided username and password
  loginManager(username: string, password: string): AngularFirestoreCollection<Manager>{
    return this.db.collection("managers", ref=>ref.where("username","==",username).where("password","==",password));
  }

  getAll(): AngularFirestoreCollection<Student> {
    return this.studentsRef;
  }

  getStudent(studentId: string): AngularFirestoreDocument<Student> {
    return this.db.collection("students").doc(studentId);
  }

  create(student: Student): any {
    return this.studentsRef.add({ ...student });
  }

  update(id: string, data: any): Promise<void> {
    return this.studentsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.studentsRef.doc(id).delete();
  }
}
