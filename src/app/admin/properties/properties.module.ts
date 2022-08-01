import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertiesComponent } from './properties.component';
import { AdminWidgetsModule } from '../admin-widgets/admin-widgets.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectCardComponent } from './project-card/project-card.component';
import { PropertyPageComponent } from './property-page/property-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { TypeModalComponent } from './type-modal/type-modal.component';
import { UnitModalComponent } from './unit-modal/unit-modal.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [PropertiesComponent, ProjectCardComponent, PropertyPageComponent, ProjectModalComponent, TypeModalComponent, UnitModalComponent,],
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    AdminWidgetsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule
  ],
  exports:[ProjectCardComponent]
})
export class PropertiesModule {}
