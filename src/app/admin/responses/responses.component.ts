import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { DataProvider } from 'src/app/providers/data.provider';
import { MatDialog } from '@angular/material/dialog';
import { AddResponseComponent } from './add-response/add-response.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { CSVService } from 'src/app/services/csv.service';
import Fuse from 'fuse.js';
import { Timestamp } from '@angular/fire/firestore';

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
  loading: boolean = false;
  responses: any[];
  filteredResponses: any[] = [];
  phases: string[] = [
    'Query',
    'Visitation',
    'Negotiation',
    'Legalization',
    'Closure',
  ];

  constructor(
    public dialog: MatDialog,
    private databaseService: DatabaseService,
    private alertify: AlertsAndNotificationsService,
    private activateRoute: ActivatedRoute,
    public dataProvider: DataProvider,
    private csvService: CSVService
  ) {
    this.activateRoute.queryParams.subscribe((data: any) => {
      if (data.openModal === 'true') {
        this.triggerAddResponse(data.customerOrLead, data.id);
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.loading = true;

    await this.databaseService.getResponsesPromise().then((docs: any) => {
      this.responses = [];
      docs.forEach((element: any) => {
        const response = { id: element.id, ...element.data() };
        this.responses.push(response);
      });
    });

    this.responses.forEach(async (response) => {
      if (response.agentId) {
        await this.databaseService
          .getAgent(response.agentId)
          .then((agentDoc) => {
            response.agent = agentDoc.data();
          });
      }
      if (response.customerId) {
        await this.databaseService
          .getCustomer(response.customerId)
          .then((customerDoc) => {
            response.customerOrLead = customerDoc.data();
          });
      }
      if (response.leadId) {
        await this.databaseService.getLead(response.leadId).then((leadDoc) => {
          response.customerOrLead = leadDoc.data();
        });
      }
      if (response.properties) {
        response.properties.forEach(
          async (property: any, index: number, properties: any[]) => {
            if (property.projectId) {
              await this.databaseService
                .getProject(property.projectId)
                .then((projectDoc) => {
                  properties[index].project = projectDoc.data();
                });
            }
            if (property.typeId) {
              await this.databaseService
                .getType(property.typeId)
                .then((typeDoc) => {
                  properties[index].type = typeDoc.data();
                });
            }
            if (property.unitId) {
              await this.databaseService
                .getUnit(property.unitId)
                .then((unitDoc) => {
                  properties[index].unit = unitDoc.data();
                });
            }
          }
        );
      }
    });

    // this.responses.sort((a: any, b: any) => {
    //   return a.customerOrLead.name.localeCompare(b.customerOrLead.name);
    // });

    this.loading = false;
    this.filteredResponses = this.responses;

    // Search responses
    const responseSearchInput = document.getElementById(
      'response-search-input'
    ) as HTMLInputElement;
    if (responseSearchInput) {
      responseSearchInput.oninput = () => {
        const query = responseSearchInput.value.trim();
        if (query.length > 0) {
          const options = {
            keys: [
              ['customerOrLead', 'name'],
              ['agent', 'displayName'],
            ],
          };
          const fuse = new Fuse(this.responses, options);
          const results = fuse.search(query);
          this.filteredResponses = [];
          results.forEach((result: any) => {
            this.filteredResponses.push(result.item);
          });
        } else {
          this.filteredResponses = this.responses;
        }
      };
    }

    // import responses
    const importResponses = document.getElementById('import-responses');
    if (importResponses) {
      importResponses.addEventListener(
        'click',
        () => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = '.csv';
          input.click();
          input.onchange = () => {
            this.dataProvider.pageSetting.blur = true;
            if (input.files && input.files[0]) {
              this.csvService.load(input.files[0]);
              setTimeout(async () => {
                const records = this.csvService.import();
                if (records && records.length) {
                  for (const record of records) {
                    // Format response data
                    const response = {
                      agentId: record.agentId,
                      customerId: record.customerId,
                      leadId: record.leadId,
                      phase: record.phase,
                      properties: [] as any[],
                      notes: {} as any,
                    };

                    // Log activity
                    response.notes[response.phase] = [
                      {
                        note: 'Imported response from CSV',
                        date: Timestamp.now(),
                        addedBy: this.dataProvider.userID,
                        addedByName: this.dataProvider.userData?.displayName,
                        addedByAccess: 'Admin',
                        file: null,
                      },
                    ];

                    // Format interested documents
                    var i = 1;
                    while (true) {
                      const property: any = {};
                      if (
                        `projectId${i}` in record &&
                        record[`projectId${i}`]
                      ) {
                        property.projectId = record[`projectId${i}`];
                      } else {
                        break;
                      }
                      if (`typeId${i}` in record) {
                        property.typeId = record[`typeId${i}`];
                      } else {
                        break;
                      }
                      if (`unitId${i}` in record) {
                        property.unitId = record[`unitId${i}`];
                      } else {
                        break;
                      }
                      response.properties.push(property);
                      i++;
                    }

                    await this.databaseService.addResponse(response);
                  }
                }

                input.value = '';
                this.ngOnInit();
                this.dataProvider.pageSetting.blur = false;
                this.alertify.presentToast(
                  'Responses added successfully',
                  'info'
                );
              }, 1000);
            }
          };
        },
        false
      );
    }

    // export responses
    const exportResponses = document.getElementById('export-responses');
    if (exportResponses) {
      exportResponses.addEventListener(
        'click',
        () => {
          if (this.responses.length > 0) {
            const keys = ['agentId', 'customerId', 'leadId', 'phase'];
            const csvData: any[][] = [keys];
            var maxProperties = 0;

            this.responses.forEach((response) => {
              const values = [];
              for (const key of keys) {
                if (key in response && response[key]) {
                  values.push(response[key]);
                } else {
                  values.push('');
                }
              }

              // Add properties
              if (response.properties && response.properties.length) {
                response.properties.forEach((property: any) => {
                  values.push(property.projectId || '');
                  values.push(property.typeId || '');
                  values.push(property.unitId || '');
                });

                // Calculate max properties
                maxProperties = Math.max(
                  maxProperties,
                  response.properties.length
                );
              }

              csvData.push(values);
            });

            // Add property headings to keys
            for (var i = 1; i <= maxProperties; i++) {
              csvData[0].push('projectId' + i);
              csvData[0].push('typeId' + i);
              csvData[0].push('unitId' + i);
            }

            this.csvService.export(csvData, 'responses');
          } else {
            this.alertify.presentToast('No responses to export', 'error');
          }
        },
        false
      );
    }
  }

  triggerAddResponse(customerOrLead?: 'customer' | 'lead', id?: string) {
    const ref = this.dialog.open(AddResponseComponent, {
      panelClass: 'dialog',
      data: {
        customerOrLead: customerOrLead,
        id: id,
      },
    });
    ref.componentInstance.responseAdded.subscribe((response: any) => {
      this.dataProvider.pageSetting.blur = true;
      this.databaseService
        .addResponse(response)
        .then((doc: any) => {
          this.ngOnInit();
          this.alertify.presentToast('Response added successfully');
          this.dataProvider.pageSetting.blur = false;
        })
        .catch(() => {
          this.alertify.presentToast('Error adding response');
          this.dataProvider.pageSetting.blur = false;
        });
    });
  }

  deleteResponse(id: string, customerOrLeadId: string) {
    if (confirm('Are you sure')) {
      this.databaseService
        .deleteResponse(id, customerOrLeadId)
        .then(() => {
          this.alertify.presentToast('Response deleted successfully');
          this.ngOnInit();
        })
        .catch(() => {
          this.alertify.presentToast('Error deleting response');
        });
    }
  }
}
