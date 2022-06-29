import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
  @Input() heading:string = 'Please add a heading to this card';
  @Input() body:string = 'This is some random text that is long and it is used here to showcase a demo now this instantly get removed when you add an actual body to it.'
  @Input() addedDate:Date = new Date();
  @Input() editMode:boolean = false;
  @Output() changedStage: EventEmitter<any> = new EventEmitter();
  @Output() changedAgent: EventEmitter<any> = new EventEmitter();
  @Output() changedBody: EventEmitter<any> = new EventEmitter();
  @Output() changedProperty: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  constructor(public dialog: MatDialog) {}
  dataForm:FormGroup = new FormGroup({
    heading: new FormControl(this.heading,[Validators.required]),
    body: new FormControl(this.body,[Validators.required])
  })
  updateForm(){
    this.heading = this.dataForm.value.heading;
    this.body = this.dataForm.value.body;
    this.changedBody.emit(this.dataForm.value);
    this.editMode = false;
  }
  ngOnInit(): void {}
  changedOption(event: any) {
    this.changedStage.emit(event.value);
  }
  changeStage(){
    const ref = this.dialog.open(ChangeStageDialog, {
      data: this.stage
    });
    ref.componentInstance.changedStage.subscribe((value) => {
      this.changedStage.emit(value);
    })
  }
  changeAgent(){
    const ref = this.dialog.open(ChangeAgentDialog, {
      data: {
        agents: this.agents,
        mainAgent: this.assignedAgentName
      }
    });
    ref.componentInstance.changedAgent.subscribe((value) => {
      this.changedAgent.emit(value);
    })
  }
  changeProperty(){
    const ref = this.dialog.open(ChangePropertyDialog, {
      data: this.propertyName
    });
    ref.componentInstance.changedProperty.subscribe((value) => {
      this.changedProperty.emit(value);
    })
  }
  delete(){
    this.deleted.emit();
  }
}

@Component({
  selector: 'dialog-data-example-dialog',
  template: `<mat-select (selectionChange)="changedAgent.emit($event)" [value]="mainAgent" >
  <mat-option mat-menu-item (click)="changedAgent.emit(agent)" *ngFor="let agent of agentsList">
      <img class="popupImage" [src]="agent.photoURL">
      {{agent.displayName}}
  </mat-option>
</mat-select>`,
})
export class ChangeAgentDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public agents: any) {}
  mainAgent = this.agents.agent;
  agentsList = this.agents.agents;
  @Output() changedAgent: EventEmitter<any> = new EventEmitter();
}

@Component({
  selector: 'dialog-data-example-dialog',
  template: `<mat-form-field appearance="fill">
  <mat-label>Favorite food</mat-label>
  <mat-select (selectionChange)="changedOption($event)" [value]="property" #stageSelector>
      <mat-option [value]="item.id" *ngFor="let item of properties" >{{item.name}}</mat-option>
  </mat-select>
</mat-form-field>`,
})
export class ChangePropertyDialog {
  @Output() changedProperty: EventEmitter<any> = new EventEmitter();
  constructor(@Inject(MAT_DIALOG_DATA) public property: any) {}
  properties = this.property.properties;
  changedOption(event: any) {
    this.changedProperty.emit(event.value);
  }
}

@Component({
  selector: 'dialog-data-example-dialog',
  template: `<mat-form-field appearance="fill">
  <mat-label>Favorite food</mat-label>
  <mat-select (selectionChange)="changedOption($event)" [value]="stage" #stageSelector>
      <mat-option value="stageOne">Stage One</mat-option>
      <mat-option value="stageTwo">Stage Two</mat-option>
      <mat-option value="stageThree">Stage Three</mat-option>
      <mat-option value="stageFour">Stage Four</mat-option>
      <mat-option value="stageFive">Stage Five</mat-option>
  </mat-select>
</mat-form-field>`,
})
export class ChangeStageDialog {
  @Output() changedStage: EventEmitter<any> = new EventEmitter();
  constructor(@Inject(MAT_DIALOG_DATA) public stage: any) {}
  changedOption(event: any) {
    this.changedStage.emit(event.value);
  }
}
