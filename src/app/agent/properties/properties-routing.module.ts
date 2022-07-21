import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertiesComponent } from './properties.component';
import { PropertyPageComponent } from './property-page/property-page.component';

const routes: Routes = [
  { path: '', component: PropertiesComponent },
  { path: '**', component: PropertyPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertiesRoutingModule {}
