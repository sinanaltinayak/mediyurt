import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

import { MatCardModule } from '@angular/material/card';
import { NgImageSliderModule } from 'ng-image-slider';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    MatCardModule,
    NgImageSliderModule,
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }