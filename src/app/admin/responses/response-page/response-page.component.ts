import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { increment } from '@firebase/firestore';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { CustomerDetailComponent } from '../customer-detail/customer-detail.component';
import { PropertyDetailComponent } from '../property-detail/property-detail.component';

@Component({
  selector: 'app-response-page',
  templateUrl: './response-page.component.html',
  styleUrls: ['./response-page.component.scss', '../../admin.util.scss'],
})
export class ResponsePageComponent implements OnInit {
  response: any;
  responseId: string = '';
  activePhase: number = 0;
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
    private dataProvider: DataProvider,
    private alertify: AlertsAndNotificationsService
  ) {
    // loading the response data from the url
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.route.params.subscribe((params) => {
          this.responseId = params['responseId'];
          this.getResponse();
        });
      }
    });
  }
  getResponse(){
    this.response = {}
    this.dataProvider.pageSetting.blur = true;
    this.databaseService.getResponse(this.responseId).then((response) => {
      console.log(response.data());
      this.response = {
        id: response.id,
        ...response.data(),
        
      };
      this.dataProvider.pageSetting.blur = false;
    });
  }
  getNotes(currentPhase: number): any[] {
    if(this.response?.phaseNotes){
      return this.response.phaseNotes[`phase${currentPhase}`];
    } else {
      return [];
    }
  }

  openPropertyDetail(){
    const dialogRef = this.dialog.open(PropertyDetailComponent,{
      data:this.response.property
    });
  }

  openCustomerDetail(){
    const dialogRef = this.dialog.open(CustomerDetailComponent,{
      data:this.response.customer
    });
  }

  ngOnInit(): void {
  }

  completePhase(): void {
    if (this.response.phase < 5 && confirm('Are you sure you want to complete this phase.')) {
      this.response.phaseNotes[`phase${this.response.phase+1}`] = [];
      console.log(this.response.phaseNotes);
      this.dataProvider.pageSetting.blur = true;
      this.databaseService
        .updateResponse(
          { phaseNotes: this.response.phaseNotes, phase: increment(1) },
          this.responseId
        )
        .then((doc) => {
          this.alertify.presentToast('Phase completed successfully');
        })
        .catch(() => {
          this.alertify.presentToast('Error completing phase');
          this.dataProvider.pageSetting.blur = false;
        })
        .finally(() => {
          this.getResponse();
          this.dataProvider.pageSetting.blur = false;
        });
      this.response.phase++;
    } else {
      this.alertify.presentToast('All phases completed');
    }
  }

  discardPhase(): void {
    if (this.response.phase > 0 && confirm('Are you sure you want to discard this phase.')) {
      delete this.response.phaseNotes[`phase${this.response.phase}`];
      console.log(this.response.phaseNotes);
      this.dataProvider.pageSetting.blur = true;
      this.databaseService
        .updateResponse(
          { phaseNotes: this.response.phaseNotes, phase: increment(-1) },
          this.responseId
        )
        .then((doc) => {
          this.alertify.presentToast('Phase discarded successfully');
        })
        .catch(() => {
          this.alertify.presentToast('Error discarding phase');
          this.dataProvider.pageSetting.blur = false;
        })
        .finally(() => {
          this.getResponse();
          this.dataProvider.pageSetting.blur = false;
        });
      this.response.phase++;
    } else {
      this.alertify.presentToast('Cannot discard query phase');
    }
  }

  addNote(activePhase: number): void {
    this.dataProvider.pageSetting.blur = false;
    const dialogRef = this.dialog.open(AddNoteFormComponent);
    dialogRef.componentInstance.submitted.subscribe((data: any) => {
      this.response.phaseNotes[`phase${activePhase}`].push({
        note: data.note,
        date: new Date(),
      });
      console.log(this.response.phaseNotes);
      this.dataProvider.pageSetting.blur = true;
      this.databaseService
        .updateResponse(
          { phaseNotes: this.response.phaseNotes },
          this.responseId
        )
        .then((doc) => {
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
  getDate(date: any): Date {
    if (date instanceof Date) {
      return date;
    } else {
      return date.toDate();
    }
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `<form [formGroup]="addNoteForm" (ngSubmit)="submit()">
    <p>
      <mat-form-field appearance="fill">
        <mat-label>Note Message</mat-label>
        <textarea
          matInput
          formControlName="note"
          placeholder="Message"
        ></textarea>
      </mat-form-field>
    </p>
    <button mat-raised-button color="primary">Submit</button>
  </form>`,
})
export class AddNoteFormComponent {
  @Output() submitted: EventEmitter<any> = new EventEmitter();
  constructor(private alertify: AlertsAndNotificationsService) {}
  addNoteForm: FormGroup = new FormGroup({
    note: new FormControl('', [Validators.required]),
  });
  submit() {
    if (this.addNoteForm.valid) {
      this.submitted.emit(this.addNoteForm.value);
    } else {
      this.alertify.presentToast('Please add a note.', 'error');
    }
  }
}
