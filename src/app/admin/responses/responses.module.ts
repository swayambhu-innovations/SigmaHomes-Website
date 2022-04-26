import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsesRoutingModule } from './responses-routing.module';
import { ResponsesComponent } from './responses.component';
import { AdminWidgetsModule } from '../admin-widgets/admin-widgets.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ResponsesComponent],
  imports: [
    CommonModule,
    ResponsesRoutingModule,
    AdminWidgetsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ResponsesModule {}
