import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadCenterRoutingModule } from './lead-center-routing.module';
import { LeadCenterComponent } from './lead-center.component';
import { LeadCardComponent } from './lead-card/lead-card.component';
import { AdminWidgetsModule } from '../admin-widgets/admin-widgets.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LeadCenterComponent,
    LeadCardComponent
  ],
  imports: [
    CommonModule,
    LeadCenterRoutingModule,
    AdminWidgetsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LeadCenterModule { }
