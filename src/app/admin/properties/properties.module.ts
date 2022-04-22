import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertiesComponent } from './properties.component';
import { WidgetsModule } from 'src/app/customer/home/widgets/widgets.module';
import { AdminWidgetsModule } from '../admin-widgets/admin-widgets.module';


@NgModule({
  declarations: [
    PropertiesComponent
  ],
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    WidgetsModule,
    AdminWidgetsModule
  ]
})
export class PropertiesModule { }
