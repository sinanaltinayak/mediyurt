import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PrivateLayoutComponent } from "./private-layout/private-layout.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

import { RouterModule } from "@angular/router";

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatMenuModule} from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([]),
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        MatListModule,
        MatFormFieldModule,
        MatMenuModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        PrivateLayoutComponent,
    ],
    declarations: [
        PrivateLayoutComponent,
        SidebarComponent,
    ]
})
export class LayoutModule {}


// This module is for importing the needed modules in order to use them in the components inside the 'layout' folder.