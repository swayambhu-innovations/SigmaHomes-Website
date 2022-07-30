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

@NgModule({
  declarations: [BroadcastComponent, NewBroadcastComponent],
  imports: [
    CommonModule,
    BroadcastRoutingModule,
    AdminWidgetsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule
  ],
  providers: [BroadcastService],
})
export class BroadcastModule {}
