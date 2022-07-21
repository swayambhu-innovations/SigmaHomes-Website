import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import Fuse from 'fuse.js';
import { CSVService } from 'src/app/services/csv.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { DataProvider } from 'src/app/providers/data.provider';
import { MatDialog } from '@angular/material/dialog';
import { AddResponseComponent } from './add-response/add-response.component';
import { AssignResponseComponent } from './assign-response/assign-response.component';
import { animate, style, transition, trigger } from '@angular/animations';
declare const UIkit: any;

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateY(100%)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class ResponsesComponent implements OnInit {
  responses: any[] = [];
  selectedResponses: any[] = [];
  agents: any[] = [];
  assignedAgent: string = '';
  loading: boolean = false;
  viewAs: any;
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  @Output() view: EventEmitter<any> = new EventEmitter<any>();

  phases: string[] = [
    'Query',
    'Visitation',
    'Negotiation',
    'Legalization',
    'Closure',
  ];

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private databaseService: DatabaseService,
    private alertify: AlertsAndNotificationsService,
    private activateRoute: ActivatedRoute,
    public dataProvider: DataProvider
  ) {
    this.activateRoute.queryParams.subscribe((data: any) => {
      console.log(data);

      if (data.openModal === 'true') {
        this.addResponse();
      }
    });
  }

  ngOnInit(): void {
    
    this.getResponses();
    this.getAgents();
    this.viewAs = 'viewAsCard';
          
    this.responses.forEach((res)=>{
      console.log(res)
    })
    this.dataProvider.headerButtonActions.subscribe((action) => {
      this.viewAs = action;
    });
  }
  getAgents() {
    this.databaseService.getAllAgentsPromise().then((docs: any) => {
      docs.forEach((element: any) => {
        this.agents.push({ ...element.data(), id: element.id });
      });
    });
  }
  getResponses() {
    this.loading = true;
    this.responses = [];
    this.databaseService
      .getResponsesPromise()
      .then((docs: any) => {
        docs.forEach((element: any) => {
          this.responses.push({ ...element.data(), id: element.id });
  
        });
      })
      .finally(() => {
        this.loading = false;
      });
  }
  addResponse() {
    const ref = this.dialog.open(AddResponseComponent);
    ref.componentInstance.addResponse.subscribe((data: any) => {
      console.log(data);
      this.databaseService
        .addResponse(data)
        .then((doc: any) => {
          this.alertify.presentToast('Response added successfully');
          this.getResponses();
        })
        .catch(() => {
          this.alertify.presentToast('Error adding response');
        });
    });
  }
  viewResponse(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }
  deleteResponse(id: string) {
    if (confirm('Are you sure')) {
      this.databaseService
        .deleteResponse(id)
        .then(() => {
          this.alertify.presentToast('Response deleted successfully');
          this.getResponses();
        })
        .catch(() => {
          this.alertify.presentToast('Error deleting response');
        });
    }
  }
  selectResponse(id: string) {
    if (this.selectedResponses.includes(id)) {
      this.selectedResponses.splice(this.selectedResponses.indexOf(id), 1);
    } else {
      this.selectedResponses.push(id);
    }
  }
  assignAgent() {
    this.selectedResponses.forEach((element: any) => {
      // console.log(element);
      this.databaseService
        .assignAgent(this.assignedAgent, element)
        .then(() => {
          this.alertify.presentToast('Agent assigned successfully');
          this.selectedResponses = [];
        })
        .catch(() => {
          this.alertify.presentToast('Error assigning agent');
        });
    });
  }
  setAgent(event: any) {
    this.assignedAgent = event.value;
  }
}
