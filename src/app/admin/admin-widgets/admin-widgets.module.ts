import { PropertiesModule } from '../properties/properties.module';
import { PropertyCardComponent } from './../../customer/components/property-card/property-card.component';
import { PropertiesComponent } from './../../customer/properties/properties.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryBtnComponent } from './buttons/primary-btn/primary-btn.component';
import { SecondaryBtnComponent } from './buttons/secondary-btn/secondary-btn.component';
import { TertiaryBtnComponent } from './buttons/tertiary-btn/tertiary-btn.component';
import { AvatarComponent } from './avatar/avatar.component';
import { FabComponent } from './fab/fab.component';
import { ResponseCardComponent } from './response-card/response-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewCustomerModalComponent } from './view-customer-modal/view-customer-modal.component';

@NgModule({
  declarations: [
    PrimaryBtnComponent,
    SecondaryBtnComponent,
    TertiaryBtnComponent,
    AvatarComponent,
    FabComponent,
    ResponseCardComponent,
    ViewCustomerModalComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    PrimaryBtnComponent,
    SecondaryBtnComponent,
    TertiaryBtnComponent,
    AvatarComponent,
    FabComponent,
    ResponseCardComponent,
    ViewCustomerModalComponent,
  ],
})
export class AdminWidgetsModule {}
