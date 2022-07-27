import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataProvider } from 'src/app/providers/data.provider';
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

  @ViewChild('customerOrLead') customerOrLead: ElementRef;

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
    public dialog: MatDialog,
    private dataProvider: DataProvider,
    @Inject(MAT_DIALOG_DATA)
    public data: { customerOrLead?: 'customer' | 'lead'; id: string }
  ) {
    this.responseForm.patchValue({
      customerId: this.data.customerOrLead == 'customer' ? this.data.id : null,
      leadId: this.data.customerOrLead == 'lead' ? this.data.id : null,
    });
  }

  ngOnInit(): void {
    this.databaseService.getCustomersPromise().then((docs: any) => {
      docs.forEach((element: any) => {
        const customer = { ...element.data(), id: element.id };
        if (!customer['responseId']) {
          this.customers.push(customer);
        }
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
        const lead = { ...element.data(), id: element.id };
        if (!lead['responseId']) {
          this.leads.push(lead);
        }
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
      const response = this.responseForm.value;
      response.notes = {};
      response.notes[response.phase] = [
        {
          note: 'Response added',
          date: Timestamp.now(),
          addedBy: this.dataProvider.userID,
          addedByName: this.dataProvider.userData?.displayName,
          addedByAccess: 'Admin',
        },
      ];
      this.responseAdded.emit(this.responseForm.value);
      this.dialog.closeAll();
      this.responseForm.reset();
    }
  }
}
