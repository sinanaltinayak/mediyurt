import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './pages/home/home.module';
import { LayoutModule } from './layout/layout.module';
import { AnnouncementsModule } from './pages/announcements/announcements.module';
import { RoomsModule } from './pages/rooms/rooms.module';
import { ProfileModule } from './pages/profile/profile.module';
import { ManagementModule } from './pages/management/management.module';
import { MatListModule } from '@angular/material/list';
import { PaymentsModule } from './pages/payments/payments.module';
import { LoadingModule } from './pages/loading/loading.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';

import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { Student } from './models/student';
import { Manager } from './models/manager';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Application } from './models/application';
import { Room } from './models/room';
import { Payment } from './models/payment';


// this module is for importing the necessary classes for the entirity of our project

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    ProfileModule,
    HomeModule,
    AnnouncementsModule,
    RoomsModule,
    LayoutModule,
    ManagementModule,
    MatListModule,
    PaymentsModule,
    LoadingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    ScreenTrackingService,UserTrackingService,
  ],
  entryComponents: [RoomsModule],
  bootstrap: [AppComponent]
})
export class AppModule { 

  // These are our global variables, they contain necessary data for each session
  static userType: string = "default";
  static userStudent = new Map<string, Student>();
  static studentHasApplication = false;

  static userManager = new Map<string, Manager>();

  static allApplications = new Map<string, Application>();
  static applicationsInfo = [];

  static allPayments = new Map<string, Payment>();
  static paymentsInfo = [];

  static allStudents = new Map<string, Student>();
  static allRooms = new Map<string, Room>();
}
