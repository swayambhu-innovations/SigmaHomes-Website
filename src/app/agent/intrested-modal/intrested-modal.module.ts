import { PropertiesModule } from './../properties/properties.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    PropertiesModule
  ],
  exports:[ModalComponent]
})
export class InterestedModalModule { }
