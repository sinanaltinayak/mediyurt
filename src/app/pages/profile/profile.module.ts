import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule} from '@angular/material/menu';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    MatButtonModule,
    MatBadgeModule,
    MatInputModule,
    MatMenuModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
  ],
  declarations: [ProfileComponent, PaymentDialogComponent]
})
export class ProfileModule { }