import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AboutSectionComponent } from './about-section/about-section.component';
import { ServicesSectionComponent } from './services-section/services-section.component';
import { PropertyCardComponent } from './property-card/property-card.component';
import { ContactSectionComponent } from './contact-section/contact-section.component';

@NgModule({
  declarations: [
    HeaderComponent, FooterComponent, AboutSectionComponent, ServicesSectionComponent, PropertyCardComponent, ContactSectionComponent
  ],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    HeaderComponent, FooterComponent, AboutSectionComponent, ServicesSectionComponent, PropertyCardComponent, ContactSectionComponent
  ]
})
export class ComponentsModule { }
