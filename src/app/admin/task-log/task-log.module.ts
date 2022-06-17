import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskLogRoutingModule } from './task-log-routing.module';
import { TaskLogComponent } from './task-log.component';
import { AdminWidgetsModule } from '../admin-widgets/admin-widgets.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TaskcardComponent } from './taskcard/taskcard.component'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import { MatMenuModule } from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddTaskComponent } from './add-task/add-task.component'; 
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [TaskLogComponent, TaskcardComponent, AddTaskComponent],
  imports: [
    CommonModule,
    TaskLogRoutingModule,
    AdminWidgetsModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatMenuModule,
    MatFormFieldModule,
    MatButtonModule
  ],
})
export class TaskLogModule {}
