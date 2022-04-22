import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitLogRoutingModule } from './visit-log-routing.module';
import { VisitLogComponent } from './visit-log.component';
import { AdminWidgetsModule } from '../admin-widgets/admin-widgets.module';


@NgModule({
  declarations: [
    VisitLogComponent
  ],
  imports: [
    CommonModule,
    VisitLogRoutingModule,
    AdminWidgetsModule
  ]
})
export class VisitLogModule { }
