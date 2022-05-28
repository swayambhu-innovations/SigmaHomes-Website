import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';

const materialModules = [MatFormFieldModule, MatChipsModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, MatFormFieldModule],
  exports: [materialModules],
})
export class MaterialModule {}
