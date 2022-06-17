import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-taskcard',
  templateUrl: './taskcard.component.html',
  styleUrls: ['./taskcard.component.scss'],
})
export class TaskcardComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  @Input() propertyName: string;
  @Input() assignedAgentImage: string;
  @Input() assignedAgentName: string;
  @Input() stage: string = 'stageOne';
  @Input() agents: any[] = [];
  @Output() changedStage: EventEmitter<any> = new EventEmitter();
  @Output() changedAgent: EventEmitter<any> = new EventEmitter();
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
  changedOption(event: any) {
    this.changedStage.emit(event.value);
  }
}

