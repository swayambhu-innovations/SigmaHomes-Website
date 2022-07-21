import { PropertiesModule } from './../properties/properties.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadCenterRoutingModule } from './lead-center-routing.module';
import { LeadCenterComponent } from './lead-center.component';
import { LeadCardComponent } from './lead-card/lead-card.component';
import { AdminWidgetsModule } from '../admin-widgets/admin-widgets.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CSVService } from 'src/app/services/csv.service';
import { RouterModule } from '@angular/router';

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
    ReactiveFormsModule,
    RouterModule,
    PropertiesModule
  ],
  providers: [CSVService],
})
export class LeadCenterModule { }
