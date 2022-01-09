import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivateLayoutComponent } from 'src/app/layout/private-layout/private-layout.component';
import { ManagementComponent } from './management.component';

const routes: Routes = [
  {
    path: 'management',
    component: PrivateLayoutComponent,
    children: [
      { path: '', component: ManagementComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
