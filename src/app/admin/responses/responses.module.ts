import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsesRoutingModule } from './responses-routing.module';
import { ResponsesComponent } from './responses.component';
import { AdminWidgetsModule } from '../admin-widgets/admin-widgets.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponsePageComponent } from './response-page/response-page.component';

@NgModule({
  declarations: [
    ResponsesComponent,
    ResponsePageComponent
  ],
  imports: [
    CommonModule,
    ResponsesRoutingModule,
    AdminWidgetsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ResponsesModule {}
