import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskLogRoutingModule } from './task-log-routing.module';
import { TaskLogComponent } from './task-log.component';
import { AdminWidgetsModule } from '../admin-widgets/admin-widgets.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TaskcardComponent } from './taskcard/taskcard.component'; 
@NgModule({
  declarations: [TaskLogComponent, TaskcardComponent],
  imports: [
    CommonModule,
    TaskLogRoutingModule,
    AdminWidgetsModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ],
})
export class TaskLogModule {}
