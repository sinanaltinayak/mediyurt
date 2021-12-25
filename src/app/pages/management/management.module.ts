import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';


@NgModule({
  imports: [
    CommonModule,
    ManagementRoutingModule,
    MatListModule,
  ],
  declarations: [ManagementComponent]
})
export class ManagementModule { }