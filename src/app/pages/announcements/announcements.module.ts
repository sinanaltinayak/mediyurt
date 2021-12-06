import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AnnouncementsRoutingModule } from './announcements-routing.module';
import { AnnouncementsComponent } from './announcements.component';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    AnnouncementsRoutingModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
  declarations: [AnnouncementsComponent]
})
export class AnnouncementsModule { }