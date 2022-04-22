import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BroadcastRoutingModule } from './broadcast-routing.module';
import { BroadcastComponent } from './broadcast.component';
import { AdminWidgetsModule } from '../admin-widgets/admin-widgets.module';


@NgModule({
  declarations: [
    BroadcastComponent
  ],
  imports: [
    CommonModule,
    BroadcastRoutingModule,
    AdminWidgetsModule
  ]
})
export class BroadcastModule { }
