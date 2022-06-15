import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { task } from 'src/app/structures/method.structure';

@Component({
  selector: 'app-task-log',
  templateUrl: './task-log.component.html',
  styleUrls: ['./task-log.component.scss'],
})
export class TaskLogComponent implements OnInit {
  taskLogs: task[] = [
    {
      id:'4324gj3g24',
      propertyName: 'Property Name',
      propertyPrice: 1_000_000,
      assignedAgentImage: 'https://pravatar.cc/300',
      assignedAgentName: 'Agent Name',
      phase: 'stageOne',
    }
  ]; 
  todoTasks:task[] = [];
  onGoingTasks:task[] = [];
  completedTasks:task[] = [];
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

  constructor() {}

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

  addLog() {}

  addNote() {}

  ngOnInit(): void {
    this.todoTasks = this.taskLogs;
  }
  drop(event:any){
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
