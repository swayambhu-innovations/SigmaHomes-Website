import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskLogComponent } from './task-log.component';

const routes: Routes = [{ path: '', component: TaskLogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskLogRoutingModule { }
