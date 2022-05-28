import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BroadcastRoutingModule } from './broadcast-routing.module';
import { BroadcastComponent } from './broadcast.component';
import { AdminWidgetsModule } from '../admin-widgets/admin-widgets.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { NewBroadcastComponent } from './new-broadcast/new-broadcast.component';

@NgModule({
  declarations: [BroadcastComponent, NewBroadcastComponent],
  imports: [
    CommonModule,
    BroadcastRoutingModule,
    AdminWidgetsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
})
export class BroadcastModule {}
