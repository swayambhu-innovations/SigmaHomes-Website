import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskLogRoutingModule } from './task-log-routing.module';
import { TaskLogComponent } from './task-log.component';
import { AdminWidgetsModule } from '../admin-widgets/admin-widgets.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TaskLogComponent],
  imports: [
    CommonModule,
    TaskLogRoutingModule,
    AdminWidgetsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class TaskLogModule {}
