import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryBtnComponent } from './buttons/primary-btn/primary-btn.component';
import { SecondaryBtnComponent } from './buttons/secondary-btn/secondary-btn.component';
import { TertiaryBtnComponent } from './buttons/tertiary-btn/tertiary-btn.component';
import { FabComponent } from './fab/fab.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewCustomerModalComponent } from './view-customer-modal/view-customer-modal.component';

@NgModule({
  declarations: [
    PrimaryBtnComponent,
    SecondaryBtnComponent,
    TertiaryBtnComponent,
    FabComponent,
    ViewCustomerModalComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    PrimaryBtnComponent,
    SecondaryBtnComponent,
    TertiaryBtnComponent,
    FabComponent,
    ViewCustomerModalComponent,
  ],
})
export class AdminWidgetsModule {}
