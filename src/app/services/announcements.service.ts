import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { docData } from 'rxfire/firestore';
import { Announcement } from '../models/announcement';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {
  private dbPath = '/announcements';

  announcementsRef: AngularFirestoreCollection<Announcement>;

  constructor(private db: AngularFirestore) {
    this.announcementsRef = db.collection(this.dbPath, ref => ref.orderBy('date', 'desc'));
  }

  getAll(): AngularFirestoreCollection<Announcement> {
    return this.announcementsRef;
  }

  create(announcement: Announcement): any {
    return this.announcementsRef.add({ ...announcement });
  }
}
