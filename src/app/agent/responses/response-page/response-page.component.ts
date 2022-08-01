import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { AddNoteFormComponent } from '../add-note-form/add-note-form.component';
import { AddVoiceNoteFormComponent } from '../add-voice-note-form/add-voice-note-form.component';
import { CustomerOrLeadDetailsComponent } from '../customer-or-lead-details/customer-or-lead-details.component';
import { InterestedPropertiesComponent } from '../interested-properties/interested-properties.component';
import { SelectNegotiationPropertyComponent } from '../select-negotiation-property/select-negotiation-property.component';

@Component({
  selector: 'app-response-page',
  templateUrl: './response-page.component.html',
  styleUrls: ['./response-page.component.scss', '../../admin.util.scss'],
})
export class ResponsePageComponent implements OnInit {
  response: any;
  phases = ['Query', 'Visitation', 'Negotiation', 'Legalization', 'Closure'];
  activePhase: number = -1;
  viewPhase: number = -1;

  notes: any[] = [];

  addNoteForm: FormGroup = new FormGroup({
    date: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    public dialog: MatDialog,
    public dataProvider: DataProvider,
    private alertify: AlertsAndNotificationsService
  ) {
    // loading the response data from the url
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.route.params.subscribe((params) => {
          this.getResponse(params['responseId']);
        });
      }
    });
  }

  ngOnInit(): void {}

  async getResponse(responseId: string) {
    this.dataProvider.pageSetting.blur = true;
    this.response = {};

    if (responseId) {
      const responseDoc = await this.databaseService.getResponse(responseId);
      if (responseDoc.exists()) {
        this.response = {
          id: responseId,
          ...responseDoc.data(),
        };
      }
    }

    if (this.response.phase) {
      this.activePhase = this.phases.indexOf(this.response.phase);
      this.viewPhase = this.activePhase;
    }

    if (this.response.agentId) {
      const agentDoc = await this.databaseService.getAgent(
        this.response.agentId
      );
      if (agentDoc.exists()) {
        this.response.agent = agentDoc.data();
      }
    }

    if (this.response.customerId) {
      const customerDoc = await this.databaseService.getCustomer(
        this.response.customerId
      );
      if (customerDoc.exists()) {
        this.response.customerOrLead = customerDoc.data();
        this.response.customerOrLead.customerOrLead = 'Customer';
      }
    }

    if (this.response.leadId) {
      const leadDoc = await this.databaseService.getLead(this.response.leadId);
      if (leadDoc.exists()) {
        this.response.customerOrLead = leadDoc.data();
        this.response.customerOrLead.customerOrLead = 'Lead';
      }
    }

    if (this.response.properties) {
      for (let i = 0; i < this.response.properties.length; i++) {
        if (this.response.properties[i].projectId) {
          const projectDoc = await this.databaseService.getProject(
            this.response.properties[i].projectId
          );
          if (projectDoc.exists()) {
            this.response.properties[i].project = {
              id: projectDoc.id,
              ...projectDoc.data(),
            };
          }
        }

        if (this.response.properties[i].typeId) {
          const typeDoc = await this.databaseService.getType(
            this.response.properties[i].typeId
          );
          if (typeDoc.exists()) {
            this.response.properties[i].type = typeDoc.data();
          }
        }

        if (this.response.properties[i].unitId) {
          const unitDoc = await this.databaseService.getUnit(
            this.response.properties[i].unitId
          );
          if (unitDoc.exists()) {
            this.response.properties[i].unit = unitDoc.data();
          }
        }
      }
    }

    this.dataProvider.pageSetting.blur = false;
  }

  viewProperties() {
    this.dialog.open(InterestedPropertiesComponent, {
      panelClass: 'dialog',
      data: {
        properties: this.response.properties,
      },
    });
  }

  viewCustomerOrLead() {
    this.dialog.open(CustomerOrLeadDetailsComponent, {
      panelClass: 'dialog',
      data: {
        customerOrLead: this.response.customerOrLead,
      },
    });
  }

  deleteResponse() {
    if (confirm('Are you sure you want to delete this response?')) {
      this.dataProvider.pageSetting.blur = true;
      this.databaseService
        .deleteResponse(
          this.response.id,
          this.response.customerId || this.response.leadId
        )
        .then(() => {
          this.router.navigate(['/admin/responses']);
          this.dataProvider.pageSetting.blur = false;
          this.alertify.presentToast('Response deleted successfully');
        });
    }
  }

  completePhase() {
    if (this.activePhase >= this.phases.length) {
      return;
    }

    if (confirm('Are you sure?')) {
      // If entering negotiation phase
      if (this.activePhase == 1 && this.response.properties.length > 1) {
        const dialogRef = this.dialog.open(SelectNegotiationPropertyComponent, {
          panelClass: 'dialog',
          data: {
            properties: this.response.properties,
          },
        });
        dialogRef.componentInstance.propertySelected.subscribe((data: any) => {
          this.response.properties = [
            this.response.properties[data.propertyIndex],
          ];

          this.dataProvider.pageSetting.blur = true;
          this.databaseService
            .updateResponse(this.response.id, {
              properties: this.response.properties,
            })
            .then(() => {
              this.activePhase++;
              this.viewPhase = this.activePhase;
              this.logPhaseCompletion(
                this.phases[this.activePhase - 1],
                this.phases[this.activePhase]
              );
              this.updatePhase('complete');
            })
            .catch(() => {
              dialogRef.close();
              this.dataProvider.pageSetting.blur = false;
              this.alertify.presentToast('Error updating response');
            })
            .finally(() => {
              dialogRef.close();
              this.dataProvider.pageSetting.blur = false;
            });
        });
      } else {
        this.activePhase++;
        this.viewPhase = this.activePhase;
        this.logPhaseCompletion(
          this.phases[this.activePhase - 1],
          this.phases[this.activePhase]
        );
        this.updatePhase('complete');
      }
    }
  }

  discardPhase() {
    if (this.activePhase <= 0) {
      return;
    }

    if (confirm('Are you sure?')) {
      this.activePhase--;
      this.viewPhase = this.activePhase;
      this.logPhaseDiscard(
        this.phases[this.activePhase + 1],
        this.phases[this.activePhase]
      );
      this.updatePhase('discard');
    }
  }

  async logPhaseCompletion(oldPhase: string, newPhase: string) {
    const oldLogNote = {
      date: Timestamp.now(),
      file: null,
      note: 'Phase marked complete',
      addedBy: this.dataProvider.userID,
      addedByName: this.dataProvider.userData?.displayName,
      addedByAccess: 'Admin',
    };
    if (!this.response.notes) {
      this.response.notes = {};
      this.response.notes[oldPhase] = [oldLogNote];
    } else if (!this.response.notes[oldPhase]) {
      this.response.notes[oldPhase] = [oldLogNote];
    } else {
      this.response.notes[oldPhase].unshift(oldLogNote);
    }

    const newLogNote = {
      date: Timestamp.now(),
      file: null,
      addedBy: this.dataProvider.userID,
      addedByName: this.dataProvider.userData?.displayName,
      addedByAccess: 'Admin',
      note: '',
    };
    if (
      this.response.notes[newPhase] &&
      this.response.notes[newPhase].length > 0
    ) {
      newLogNote.note = 'Phase restarted';
    } else {
      newLogNote.note = 'Phase started';
    }

    if (!this.response.notes[newPhase]) {
      this.response.notes[newPhase] = [newLogNote];
    } else {
      this.response.notes[newPhase].unshift(newLogNote);
    }

    await this.databaseService.updateResponse(this.response.id, {
      notes: this.response.notes,
    });
  }

  async logPhaseDiscard(oldPhase: string, newPhase: string) {
    const oldLogNote = {
      date: Timestamp.now(),
      file: null,
      note: 'Phase discarded',
      addedBy: this.dataProvider.userID,
      addedByName: this.dataProvider.userData?.displayName,
      addedByAccess: 'Admin',
    };

    if (!this.response.notes) {
      this.response.notes = {};
      this.response.notes[oldPhase] = [oldLogNote];
    } else if (!this.response.notes[oldPhase]) {
      this.response.notes[oldPhase] = [oldLogNote];
    } else {
      this.response.notes[oldPhase].unshift(oldLogNote);
    }

    const newLogNote = {
      date: Timestamp.now(),
      file: null,
      addedBy: this.dataProvider.userID,
      addedByName: this.dataProvider.userData?.displayName,
      addedByAccess: 'Admin',
      note: 'Phase restarted',
    };

    if (!this.response.notes[newPhase]) {
      this.response.notes[newPhase] = [newLogNote];
    } else {
      this.response.notes[newPhase].unshift(newLogNote);
    }

    await this.databaseService.updateResponse(this.response.id, {
      notes: this.response.notes,
    });
  }

  updatePhase(update: 'complete' | 'discard'): void {
    this.dataProvider.pageSetting.blur = true;
    this.response.phase = this.phases[this.activePhase];
    this.databaseService
      .updateResponse(this.response.id, {
        phase: this.response.phase,
      })
      .then(() => {
        this.alertify.presentToast(
          'Phase ' +
            (update == 'complete' ? 'marked completed' : 'discarded') +
            ' successfully'
        );
      })
      .catch(() => {
        this.alertify.presentToast('Error completing phase');
      })
      .finally(() => {
        this.dataProvider.pageSetting.blur = false;
      });
  }

  getNotes(currentPhase: number): any[] {
    if (this.response?.notes) {
      return this.response.notes[currentPhase];
    } else {
      return [];
    }
  }

  addNote(): void {
    const dialogRef = this.dialog.open(AddNoteFormComponent, {
      panelClass: 'dialog',
      data: {
        responseId: this.response.id,
      },
    });
    dialogRef.componentInstance.noteAdded.subscribe((note: any) => {
      if (!('notes' in this.response)) {
        this.response.notes = {};
      }
      if (
        this.response.notes &&
        this.phases[this.viewPhase] in this.response.notes
      ) {
        this.response.notes[this.phases[this.viewPhase]].unshift(note);
      } else {
        this.response.notes[this.phases[this.viewPhase]] = [note];
      }
      this.dataProvider.pageSetting.blur = true;
      this.databaseService
        .updateResponse(this.response.id, { notes: this.response.notes })
        .then(() => {
          this.alertify.presentToast('Note added successfully');
        })
        .catch(() => {
          dialogRef.close();
          this.dataProvider.pageSetting.blur = false;
          this.alertify.presentToast('Error adding note');
        })
        .finally(() => {
          dialogRef.close();
          this.dataProvider.pageSetting.blur = false;
        });
    });
  }

  addVoiceNote(): void {
    const dialogRef = this.dialog.open(AddVoiceNoteFormComponent, {
      panelClass: 'dialog',
      data: {
        responseId: this.response.id,
      },
    });
    dialogRef.componentInstance.voiceNoteAdded.subscribe((note: any) => {
      if (!('notes' in this.response)) {
        this.response.notes = {};
      }
      if (
        this.response.notes &&
        this.phases[this.viewPhase] in this.response.notes
      ) {
        this.response.notes[this.phases[this.viewPhase]].unshift(note);
      } else {
        this.response.notes[this.phases[this.viewPhase]] = [note];
      }
      this.dataProvider.pageSetting.blur = true;
      this.databaseService
        .updateResponse(this.response.id, { notes: this.response.notes })
        .then(() => {
          this.alertify.presentToast('Voice note added successfully');
        })
        .catch(() => {
          dialogRef.close();
          this.dataProvider.pageSetting.blur = false;
          this.alertify.presentToast('Error adding voice note');
        })
        .finally(() => {
          dialogRef.close();
          this.dataProvider.pageSetting.blur = false;
        });
    });
  }
}
