import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BroadcastRoutingModule } from './broadcast-routing.module';
import { BroadcastComponent } from './broadcast.component';
import { AdminWidgetsModule } from '../admin-widgets/admin-widgets.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { NewBroadcastComponent } from './new-broadcast/new-broadcast.component';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input';
 
 
 @NgModule({
  declarations: [BroadcastComponent, NewBroadcastComponent],
  imports: [
    CommonModule,
    BroadcastRoutingModule,
    AdminWidgetsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    MatDialogModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [BroadcastService],
})
export class BroadcastModule {}
