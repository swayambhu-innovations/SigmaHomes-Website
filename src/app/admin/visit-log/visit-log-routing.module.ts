import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitLogComponent } from './visit-log.component';

const routes: Routes = [{ path: '', component: VisitLogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitLogRoutingModule { }
