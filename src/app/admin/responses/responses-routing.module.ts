import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResponsePageComponent } from './response-page/response-page.component';
import { ResponsesComponent } from './responses.component';

const routes: Routes = [
  { path: '', component: ResponsesComponent },
  { path: ':responseId', component: ResponsePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponsesRoutingModule {}
