import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { collection, query, doc, deleteDoc } from 'firebase/firestore';
import { flatMap, map, Observable } from 'rxjs';
import { AppModule } from './app.module';
import { Application } from './models/application';
import { Student } from './models/student';
import { ApplicationsService } from './services/applications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mediyurt';


  constructor (private store: AngularFirestore, private _snackBar: MatSnackBar) { }

  openSnackBar(title: string, action: string) {
    this._snackBar.open(title, action, {
      horizontalPosition: "right",
      verticalPosition: "bottom",
      duration: 5000,
    });
  }

  delete() {
    this.store.collection('students', ref=>ref.where("username","==","sinoş")).get().subscribe(data=>data.forEach(function(doc) {
      doc.ref.delete();
    }));
  }

  updateDoc(_username: string, _value: string) {
    let doc = this.store.collection<Student>('students', ref => ref.where('username', '==', _username));
    doc.snapshotChanges().pipe(
      map(actions => actions.map(a => {                                                      
        const data = a.payload.doc.data() as Student;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))).subscribe((_doc: any) => {
       let id = _doc[0].payload.doc.id; //first result of query [0]
       this.store.doc(`students/${id}`).update({username: _value});
      })
  }

}
