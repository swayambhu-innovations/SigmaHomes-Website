import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsesRoutingModule } from './responses-routing.module';
import { ResponsesComponent } from './responses.component';
import { AdminWidgetsModule } from '../admin-widgets/admin-widgets.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponsePageComponent } from './response-page/response-page.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { AddResponseComponent } from './add-response/add-response.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { InterestedPropertiesComponent } from './interested-properties/interested-properties.component';
import { PropertiesModule } from '../properties/properties.module';
import { CustomerOrLeadDetailsComponent } from './customer-or-lead-details/customer-or-lead-details.component';
import { SelectNegotiationPropertyComponent } from './select-negotiation-property/select-negotiation-property.component';
import { AddNoteFormComponent } from './add-note-form/add-note-form.component';
import { AddVoiceNoteFormComponent } from './add-voice-note-form/add-voice-note-form.component';
import { ChangeAgentComponent } from './change-agent/change-agent.component';

@NgModule({
  declarations: [
    ResponsesComponent,
    ResponsePageComponent,
    AddResponseComponent,
    InterestedPropertiesComponent,
    CustomerOrLeadDetailsComponent,
    SelectNegotiationPropertyComponent,
    AddNoteFormComponent,
    AddVoiceNoteFormComponent,
    ChangeAgentComponent,
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
    MatButtonModule,
    PropertiesModule,
  ],
})
export class ResponsesModule {}
