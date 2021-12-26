import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
    ReactiveFormsModule,
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
    PaymentsModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  entryComponents: [RoomsModule],
  bootstrap: [AppComponent]
})
export class AppModule { 

  static globalUserID: number;

}
