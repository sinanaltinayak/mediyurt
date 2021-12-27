import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  imports: [
    CommonModule,
    ManagementRoutingModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
  ],
  declarations: [ManagementComponent]
})
export class ManagementModule { }