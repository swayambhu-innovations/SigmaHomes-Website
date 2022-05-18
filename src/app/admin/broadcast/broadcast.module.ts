import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BroadcastRoutingModule } from './broadcast-routing.module';
import { BroadcastComponent } from './broadcast.component';
import { AdminWidgetsModule } from '../admin-widgets/admin-widgets.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BroadcastComponent],
  imports: [
    CommonModule,
    BroadcastRoutingModule,
    AdminWidgetsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class BroadcastModule {}
