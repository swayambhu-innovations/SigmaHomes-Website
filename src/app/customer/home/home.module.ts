import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { FirstSectionComponent } from 'src/app/customer/home/first-section/first-section.component';
import { PropertiesSectionComponent } from './properties-section/properties-section.component';
import { GallerySectionComponent } from './gallery-section/gallery-section.component';
import { PartnerSectionComponent } from './partner-section/partner-section.component';
import { HomeRoutingModule } from './home-routing.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    HomeComponent,
    FirstSectionComponent,
    PropertiesSectionComponent,
    GallerySectionComponent,
    PartnerSectionComponent
  ],
  imports: [CommonModule, HomeRoutingModule, ComponentsModule],
})
export class HomeModule {}
