import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsesRoutingModule } from './responses-routing.module';
import { ResponsesComponent } from './responses.component';
import { AdminWidgetsModule } from '../admin-widgets/admin-widgets.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNoteFormComponent, ResponsePageComponent } from './response-page/response-page.component';
import {MatSelectModule} from '@angular/material/select'; 
import {MatDialogModule} from '@angular/material/dialog';
import { AddResponseComponent } from './add-response/add-response.component'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button';
import { AssignResponseComponent } from './assign-response/assign-response.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';

@NgModule({
  declarations: [
    ResponsesComponent,
    ResponsePageComponent,
    AddResponseComponent,
    AssignResponseComponent,
    AddNoteFormComponent,
    CustomerDetailComponent,
    PropertyDetailComponent
  ],
  imports: [
    CommonModule,
    ResponsesRoutingModule,
    AdminWidgetsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
})
export class ResponsesModule {}
