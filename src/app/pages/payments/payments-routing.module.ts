import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivateLayoutComponent } from 'src/app/layout/private-layout/private-layout.component';
import { PaymentsComponent } from './payments.component';

const routes: Routes = [
  {
    path: 'payments',
    component: PrivateLayoutComponent,
    children: [
      { path: '', component: PaymentsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
