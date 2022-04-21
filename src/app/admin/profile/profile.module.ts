import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { AdminWidgetsModule } from '../admin-widgets/admin-widgets.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, ProfileRoutingModule, AdminWidgetsModule],
})
export class ProfileModule {}
