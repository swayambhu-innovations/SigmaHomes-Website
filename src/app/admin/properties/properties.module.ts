import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertiesComponent } from './properties.component';
import { AdminWidgetsModule } from '../admin-widgets/admin-widgets.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertyCardComponent } from './property-card/property-card.component';


@NgModule({
  declarations: [
    PropertiesComponent,
    PropertyCardComponent
  ],
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    AdminWidgetsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PropertiesModule { }
