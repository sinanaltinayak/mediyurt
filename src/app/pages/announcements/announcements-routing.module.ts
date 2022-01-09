import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivateLayoutComponent } from 'src/app/layout/private-layout/private-layout.component';
import { AnnouncementsComponent } from './announcements.component';

const routes: Routes = [
  {
    path: 'announcements',
    component: PrivateLayoutComponent,
    children: [
      { path: '', component: AnnouncementsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementsRoutingModule { }
