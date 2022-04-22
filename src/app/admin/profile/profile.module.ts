import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { AdminWidgetsModule } from '../admin-widgets/admin-widgets.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    AdminWidgetsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProfileModule {}
