import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PropertyCardComponent } from './property-card/property-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent, FooterComponent, PropertyCardComponent
  ],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    HeaderComponent, FooterComponent, PropertyCardComponent
  ]
})
export class WidgetsModule { }
