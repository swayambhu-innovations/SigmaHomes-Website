import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { task } from 'src/app/structures/method.structure';
import { AddTaskComponent } from './add-task/add-task.component';
declare const UIkit: any;
@Component({
  selector: 'app-task-log',
  templateUrl: './task-log.component.html',
  styleUrls: ['./task-log.component.scss'],
})
export class TaskLogComponent implements OnInit {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  agents: any[] = [];
  taskLogs: task[] = [];
  todoTasks: task[] = [];
  onGoingTasks: task[] = [];
  completedTasks: task[] = [];
  curResponse: number = -1;
  activePhaseTab: string = '';

  addLogForm: FormGroup = new FormGroup({
    responseId: new FormControl('', [Validators.required]),
    property: new FormControl('', [Validators.required]),
  });

  addNoteForm: FormGroup = new FormGroup({
    date: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialog: MatDialog,
    private dataProvider: DataProvider,
    private alertify: AlertsAndNotificationsService,
    private databaseService: DatabaseService,
    private activateRoute : ActivatedRoute
  )
  {
    this.activateRoute.queryParams.subscribe((data: any) => {
      console.log(data);
     
      if (data.openModal === 'true') {
        this.addTask('todo')
      }
    });
  }

  loadTaskLogDetails(index: number) {
    this.curResponse = index;
    this.activePhaseTab = this.taskLogs[index].phase;
  }

  stageChecker(stage: string): number {
    switch (stage) {
      case 'stageOne':
        return 1;
      case 'stageTwo':
        return 2;
      case 'stageThree':
        return 3;
    }
    return -1;
  }

  responseClick(event: Event, id: any) {
    const responseInput = document.getElementById('response-input');
    if (responseInput) {
      responseInput.setAttribute('value', id);
    }
  }
  updateBody(event: any, type: 'todo' | 'ongoing' | 'completed') {
    console.log(event, type);
  }

  addTask(type: 'todo' | 'ongoing' | 'completed') {
    if (type === 'todo') {
      var dialogRef = this.dialog.open(AddTaskComponent, {
        data: type,
      });
    } else if (type === 'ongoing') {
      var dialogRef = this.dialog.open(AddTaskComponent, {
        data: type,
      });
    } else {
      var dialogRef = this.dialog.open(AddTaskComponent, {
        data: type,
      });
    }
    dialogRef.componentInstance.addTask.subscribe((data: any) => {
      this.dataProvider.pageSetting.blur = true;
      if (data.type === 'todo') {
        // this.todoTasks.push(data.task);
        this.databaseService
          .addTodoTask(data.task)
          .then(() => {
            this.alertify.presentToast('Task added successfully');
          })
          .catch(() => {
            this.alertify.presentToast('Error adding task');
            this.dataProvider.pageSetting.blur = false;
          })
          .finally(() => {
            this.ngOnInit();
            this.dataProvider.pageSetting.blur = false;
          });
      } else if (data.type === 'ongoing') {
        // this.onGoingTasks.push(data.task);
        this.databaseService
          .addOnGoingTask(data.task)
          .then(() => {
            this.alertify.presentToast('Task added successfully');
          })
          .catch(() => {
            this.alertify.presentToast('Error adding task');
            this.dataProvider.pageSetting.blur = false;
          })
          .finally(() => {
            this.ngOnInit();
            this.dataProvider.pageSetting.blur = false;
          });
      } else {
        // this.completedTasks.push(data.task);
        this.databaseService
          .addCompletedTask(data.task)
          .then(() => {
            this.alertify.presentToast('Task added successfully');
          })
          .catch(() => {
            this.alertify.presentToast('Error adding task');
            this.dataProvider.pageSetting.blur = false;
          })
          .finally(() => {
            this.ngOnInit();
            this.dataProvider.pageSetting.blur = false;
          });
      }
    });
  }

  ngOnInit(): void {
    this.dataProvider.pageSetting.blur = true;
    this.databaseService.getTodoTasks().then((data: any) => {
      this.todoTasks = [];
      data.forEach((data: any) => {
        this.todoTasks.push({ ...data.data(), id: data.id });
      });
      this.dataProvider.pageSetting.blur = false;
    });
    this.databaseService.getOnGoingTasks().then((data: any) => {
      this.onGoingTasks = [];
      data.forEach((data: any) => {
        this.onGoingTasks.push({ ...data.data(), id: data.id });
      });
      this.dataProvider.pageSetting.blur = false;
    });
    this.databaseService.getCompletedTasks().then((data: any) => {
      this.completedTasks = [];
      data.forEach((data: any) => {
        this.completedTasks.push({ ...data.data(), id: data.id });
      });
      this.dataProvider.pageSetting.blur = false;
    });
    this.databaseService.getAllAgentsPromise().then((data: any) => {
      this.agents = [];
      data.forEach((element: any) => {
        this.agents.push(element.data());
      });
    });
  }
  drop(event: any) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    console.log(this.todoTasks, this.onGoingTasks, this.completedTasks);
  }
  changeStage(
    event: any,
    type: 'todoTasks' | 'onGoingTasks' | 'completedTasks',
    index: number
  ) {
    this.dataProvider.pageSetting.blur = true;
    if (type === 'todoTasks') {
      console.log(this.todoTasks[index], event);
      this.databaseService
        .setTodoStage(this.todoTasks[index].id, event)
        .then(() => {
          this.dataProvider.pageSetting.blur = false;
          this.alertify.presentToast('Stage changed successfully');
          this.ngOnInit();
        })
        .catch(() => {
          this.alertify.presentToast('Error changing stage');
          this.dataProvider.pageSetting.blur = false;
        });
    } else if (type === 'onGoingTasks') {
      this.databaseService
        .setOnGoingStage(this.onGoingTasks[index].id, event)
        .then(() => {
          this.alertify.presentToast('Stage changed successfully');
          this.dataProvider.pageSetting.blur = false;
          this.ngOnInit();
        })
        .catch(() => {
          this.alertify.presentToast('Error changing stage');
          this.dataProvider.pageSetting.blur = false;
        });
      this.onGoingTasks[index].phase = event;
    } else if (type === 'completedTasks') {
      this.databaseService
        .setCompletedStage(this.completedTasks[index].id, event)
        .then(() => {
          this.alertify.presentToast('Stage changed successfully');
          this.dataProvider.pageSetting.blur = false;
          this.ngOnInit();
        })
        .catch(() => {
          this.alertify.presentToast('Error changing stage');
          this.dataProvider.pageSetting.blur = false;
        });
      this.completedTasks[index].phase = event;
    }
    console.log(this.todoTasks, this.onGoingTasks, this.completedTasks);
  }
  changeAgent(
    event: any,
    type: 'todoTasks' | 'onGoingTasks' | 'completedTasks',
    index: number
  ) {
    this.dataProvider.pageSetting.blur = true;
    // console.log(this.todoTasks[index].id,{assignedAgentName:event.displayName,assignedAgentImage:event.photoURL});
    if (type === 'todoTasks') {
      this.databaseService
        .updateTodoTask(this.todoTasks[index].id, {
          assignedAgentName: event.displayName,
          assignedAgentImage: event.photoURL,
          assignedAgentId: event.userId,
        })
        .then(() => {
          this.alertify.presentToast('Agent changed successfully');
          this.dataProvider.pageSetting.blur = false;
          this.ngOnInit();
        })
        .catch(() => {
          this.alertify.presentToast('Error changing agent');
          this.dataProvider.pageSetting.blur = false;
        });
    } else if (type === 'onGoingTasks') {
      this.databaseService
        .updateOnGoingTask(this.onGoingTasks[index].id, {
          assignedAgentName: event.displayName,
          assignedAgentImage: event.photoURL,
          assignedAgentId: event.userId,
        })
        .then(() => {
          this.alertify.presentToast('Agent changed successfully');
          this.dataProvider.pageSetting.blur = false;
          this.ngOnInit();
        })
        .catch(() => {
          this.alertify.presentToast('Error changing agent');
          this.dataProvider.pageSetting.blur = false;
        });
    } else if (type === 'completedTasks') {
      this.databaseService
        .updateCompletedTask(this.completedTasks[index].id, {
          assignedAgentName: event.displayName,
          assignedAgentImage: event.photoURL,
          assignedAgentId: event.userId,
        })
        .then(() => {
          this.alertify.presentToast('Agent changed successfully');
          this.dataProvider.pageSetting.blur = false;
          this.ngOnInit();
        })
        .catch(() => {
          this.alertify.presentToast('Error changing agent');
          this.dataProvider.pageSetting.blur = false;
        });
    }
    // console.log(this.todoTasks, this.onGoingTasks, this.completedTasks);
  }
}
