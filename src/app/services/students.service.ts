import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Manager } from '../models/manager';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private dbPath = '/students';

  studentsRef: AngularFirestoreCollection<Student>;

  constructor(private db: AngularFirestore) {
    this.studentsRef = db.collection(this.dbPath);
  }

  loginStudent(username: string, password: string): AngularFirestoreCollection<Student>{
    return this.db.collection("students", ref=>ref.where("username","==",username).where("password","==",password));
   }  
   
  loginManager(username: string, password: string): AngularFirestoreCollection<Manager>{
    return this.db.collection("managers", ref=>ref.where("username","==",username).where("password","==",password));
  }

  getAll(): AngularFirestoreCollection<Student> {
    return this.studentsRef;
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
