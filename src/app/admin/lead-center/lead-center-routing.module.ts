import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadCenterComponent } from './lead-center.component';

const routes: Routes = [{ path: '', component: LeadCenterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadCenterRoutingModule { }
