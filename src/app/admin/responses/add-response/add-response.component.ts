import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-response',
  templateUrl: './add-response.component.html',
  styleUrls: ['./add-response.component.scss'],
})
export class AddResponseComponent implements OnInit {
  customers: any[] = [];
  leads: any[] = [];
  projects: any[] = [];
  types: any[] = [];
  units: any[] = [];
  agents: any[] = [];
  phases: string[] = [
    'Query',
    'Visitation',
    'Negotiation',
    'Legalization',
    'Closure',
  ];
  allowMultiple: boolean = true;

  responseForm: FormGroup = new FormGroup({
    customerId: new FormControl(null),
    leadId: new FormControl(null),
    agentId: new FormControl(null, Validators.required),
    phase: new FormControl(null, Validators.required),
    properties: new FormArray(
      [
        new FormGroup({
          projectId: new FormControl(null, Validators.required),
          typeId: new FormControl(null),
          unitId: new FormControl(null),
        }),
      ],
      Validators.required
    ),
  });

  @Output() responseAdded: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private databaseService: DatabaseService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.databaseService.getCustomersPromise().then((docs: any) => {
      docs.forEach((element: any) => {
        this.customers.push({ ...element.data(), id: element.id });
      });
    });
    this.databaseService.getAllProjectsPromise().then((docs: any) => {
      docs.forEach((element: any) => {
        this.projects.push({ ...element.data(), id: element.id });
      });
    });
    this.databaseService.getAllTypesPromise().then((docs: any) => {
      docs.forEach((element: any) => {
        this.types.push({ ...element.data(), id: element.id });
      });
    });
    this.databaseService.getAllUnitsPromise().then((docs: any) => {
      docs.forEach((element: any) => {
        this.units.push({ ...element.data(), id: element.id });
      });
    });
    this.databaseService.getAllAgentsPromise().then((docs: any) => {
      docs.forEach((element: any) => {
        this.agents.push({ ...element.data(), id: element.id });
      });
    });
    this.databaseService.getLeadsPromise().then((data: any) => {
      data.forEach((element: any) => {
        this.leads.push({ ...element.data(), id: element.id });
      });
    });
  }

  calcMultiple(): void {
    this.allowMultiple = ['Query', 'Visitation'].includes(
      this.responseForm.value.phase
    );
  }

  getPropertyControls() {
    return (this.responseForm.get('properties') as FormArray).controls;
  }

  addProperty(): void {
    if (this.allowMultiple) {
      (this.responseForm.get('properties') as FormArray).push(
        new FormGroup({
          projectId: new FormControl(null, Validators.required),
          typeId: new FormControl(null),
          unitId: new FormControl(null),
        })
      );
    }
  }

  deleteProperty(index: number) {
    (this.responseForm.get('properties') as FormArray).removeAt(index);
  }

  responseFormIsValid() {
    return (
      this.responseForm.valid &&
      (this.responseForm.get('customerId')?.value ||
        this.responseForm.get('leadId')?.value)
    );
  }

  submit() {
    if (this.responseFormIsValid()) {
      this.responseAdded.emit(this.responseForm.value);
      this.dialog.closeAll();
      this.responseForm.reset();
    }
  }
}
