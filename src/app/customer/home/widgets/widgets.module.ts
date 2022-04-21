import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PropertyCardComponent } from './property-card/property-card.component';

@NgModule({
  declarations: [
    HeaderComponent, FooterComponent, PropertyCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent, FooterComponent, PropertyCardComponent
  ]
})
export class WidgetsModule { }
