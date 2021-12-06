import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivateLayoutComponent } from 'src/app/layout/private-layout/private-layout.component';
import { PublicLayoutComponent } from '../../layout/public-layout/public-layout.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: 'profile',
    component: PrivateLayoutComponent,
    children: [
      { path: '', component: ProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
