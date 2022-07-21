import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertiesComponent } from './properties.component';
import { AdminWidgetsModule } from '../admin-widgets/admin-widgets.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectCardComponent } from './project-card/project-card.component';
import { PropertyPageComponent } from './property-page/property-page.component';
@NgModule({
  declarations: [PropertiesComponent, ProjectCardComponent, PropertyPageComponent,],
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    AdminWidgetsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[ProjectCardComponent]
})
export class PropertiesModule {}
