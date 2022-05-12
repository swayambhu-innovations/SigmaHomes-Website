import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FirstSectionComponent } from 'src/app/customer/home/first-section/first-section.component';
import { AboutSectionComponent } from './about-section/about-section.component';
import { ServicesSectionComponent } from './services-section/services-section.component';
import { PropertiesSectionComponent } from './properties-section/properties-section.component';
import { GallerySectionComponent } from './gallery-section/gallery-section.component';
import { PartnerSectionComponent } from './partner-section/partner-section.component';
import { WidgetsModule } from './widgets/widgets.module';


@NgModule({
  declarations: [
    HomeComponent,
    FirstSectionComponent,
    AboutSectionComponent,
    ServicesSectionComponent,
    PropertiesSectionComponent,
    GallerySectionComponent,
    PartnerSectionComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    WidgetsModule
  ]
})
export class HomeModule { }