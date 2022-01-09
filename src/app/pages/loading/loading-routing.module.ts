import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivateLayoutComponent } from 'src/app/layout/private-layout/private-layout.component';
import { LoadingComponent } from './loading.component';

const routes: Routes = [
  {
    path: 'loading',
    component: PrivateLayoutComponent,
    children: [
      { path: '', component: LoadingComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadingRoutingModule { }
