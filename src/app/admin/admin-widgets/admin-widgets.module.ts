import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryBtnComponent } from './buttons/primary-btn/primary-btn.component';
import { SecondaryBtnComponent } from './buttons/secondary-btn/secondary-btn.component';
import { TertiaryBtnComponent } from './buttons/tertiary-btn/tertiary-btn.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { AvatarComponent } from './avatar/avatar.component';
import { FabComponent } from './fab/fab.component';
import { PropertyInfoCardComponent } from './property-info-card/property-info-card.component';

@NgModule({
  declarations: [
    PrimaryBtnComponent,
    SecondaryBtnComponent,
    TertiaryBtnComponent,
    StarRatingComponent,
    AvatarComponent,
    FabComponent,
    PropertyInfoCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PrimaryBtnComponent,
    SecondaryBtnComponent,
    TertiaryBtnComponent,
    StarRatingComponent,
    AvatarComponent,
    FabComponent,
    PropertyInfoCardComponent
  ]
})
export class AdminWidgetsModule { }
