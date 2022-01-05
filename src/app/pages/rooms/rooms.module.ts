import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';

import { MatCardModule } from '@angular/material/card'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { ExamineRoomDialogComponent } from './examine-room-dialog/examine-room-dialog.component';
import { EditRoomDialogComponent } from './edit-room-dialog/edit-room-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule} from '@angular/material/menu';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { ApplicationDialogComponent } from './application-dialog/application-dialog.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatIconModule } from '@angular/material/icon';





@NgModule({
  imports: [
    CommonModule,
    RoomsRoutingModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxMatFileInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
  ],
  declarations: [RoomsComponent, ExamineRoomDialogComponent, EditRoomDialogComponent, ApplicationDialogComponent, AddRoomComponent]
})
export class RoomsModule { }


