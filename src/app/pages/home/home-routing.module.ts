import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivateLayoutComponent } from 'src/app/layout/private-layout/private-layout.component';
import { PublicLayoutComponent } from '../../layout/public-layout/public-layout.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: 'home',
    component: PrivateLayoutComponent,
    children: [
      { path: '', component: HomeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
