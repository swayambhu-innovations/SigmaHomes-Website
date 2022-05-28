import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BroadcastComponent } from './broadcast.component';
import { NewBroadcastComponent } from './new-broadcast/new-broadcast.component';

const routes: Routes = [{ path: '', component: BroadcastComponent }, { path: 'new-broadcast', component: NewBroadcastComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BroadcastRoutingModule { }
