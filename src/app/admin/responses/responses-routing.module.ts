import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResponsesComponent } from './responses.component';

const routes: Routes = [{ path: '', component: ResponsesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsesRoutingModule { }
