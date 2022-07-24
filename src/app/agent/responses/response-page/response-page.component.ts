import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
    public dataProvider: DataProvider,
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
  getResponse() {
    this.response = {};
    this.dataProvider.pageSetting.blur = true;
    this.databaseService.getResponse(this.responseId).then((response) => {
      this.response = {
        id: response.id,
        ...response.data(),
      };
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
  checkForCompletion() {
    console.log(this.response);
    if (this.response?.requestPending) {
      this.completePhase();
      this.response.requestPending = false;
      this.databaseService
        .updateResponse(this.response, this.responseId)
        .then(() => {
          this.alertify.presentToast('Phase Completed successfully');
        });
    }
  }
  openPropertyDetail() {
    const dialogRef = this.dialog.open(PropertyDetailComponent, {
      data: this.response.property,
    });
  }

  openCustomerDetail() {
    const dialogRef = this.dialog.open(CustomerDetailComponent, {
      data: this.response.customer,
    });
  }

  ngOnInit(): void {}

  completePhase(): void {
    if (
      this.response.phase < 5 &&
      confirm('Are you sure you want to complete this phase.')
    ) {
      this.response.notes[this.response.phase + 1] = [];
      console.log(this.response.notes);
      this.dataProvider.pageSetting.blur = true;
      this.databaseService
        .updateResponse(
          { notes: this.response.notes, phase: increment(1) },
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
    if (
      this.response.phase > 0 &&
      confirm('Are you sure you want to discard this phase.')
    ) {
      delete this.response.notes[this.response.phase];
      console.log(this.response.notes);
      this.dataProvider.pageSetting.blur = true;
      this.databaseService
        .updateResponse(
          { notes: this.response.notes, phase: increment(-1) },
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
  requestForComplete() {
    if (!this.response?.requestPending) {
      this.response.requestPending = true;
      console.log(this.response);
      this.databaseService
        .updateResponse(this.response, this.responseId)
        .then(() => {
          this.alertify.presentToast('Request sent successfully');
        });
    }
    console.log('requestForComplete');
  }

  addNote(activePhase: number): void {
    this.dataProvider.pageSetting.blur = false;
    const dialogRef = this.dialog.open(AddNoteFormComponent);
    dialogRef.componentInstance.submitted.subscribe((data: any) => {
      this.response.notes[activePhase].push({
        note: data.note,
        date: new Date(),
        image: data.image,
        userName: this.dataProvider.userData?.displayName,
        userType: this.dataProvider.userData?.access?.access,
      });
      console.log(this.response.notes);
      this.dataProvider.pageSetting.blur = true;
      this.databaseService
        .updateResponse(
          { notes: this.response.notes },
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
    <div>
      <div
        style="background-color:var(--secondary-light); margin:1rem;padding:2rem;border-radius:0.3rem;"
        (click)="image.click()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="76.102"
          viewBox="0 0 67.224 76.102"
          style="margin-left:2.3rem;"
        >
          <path
            id="file"
            d="M48.817,1.125H3.375v76.1H70.6V22.9ZM65.526,25.006v.219H46.5V6.2h.219ZM8.448,72.153V6.2H41.426V30.3h24.1V72.156Z"
            transform="translate(-3.375 -1.125)"
            fill="#b8b8b8"
          />
        </svg>
        <p for="avatar">Select Note Image</p>
        <input
          type="file"
          id="imageSelector"
          hidden
          (change)="verifyImage()"
          #image
        />
      </div>

      <mat-form-field appearance="fill" style="width:100%">
        <mat-label>Note Message</mat-label>
        <textarea
          matInput
          formControlName="note"
          placeholder="Message"
        ></textarea>
      </mat-form-field>
    </div>
    <button mat-raised-button color="primary">Submit</button>
  </form>`,
})
export class AddNoteFormComponent {
  @ViewChild('imageSelector') photoInput: ElementRef;
  @Output() submitted: EventEmitter<any> = new EventEmitter();

  imageFile: File | false;
  constructor(
    private alertify: AlertsAndNotificationsService,
    private databaseService: DatabaseService
  ) {}
  addNoteForm: FormGroup = new FormGroup({
    image: new FormControl(''),
    note: new FormControl('', [Validators.required]),
  });

  async submit() {
    const userPhoto = document.getElementById(
      'imageSelector'
    ) as HTMLInputElement;
    if (userPhoto && userPhoto.files && userPhoto.files.length > 0) {
      await this.databaseService
        .upload('users/' + new Date().getTime(), userPhoto.files[0])
        .then((url) => {
          this.addNoteForm.get('image')!.setValue(url);
          console.log(url);
        });
    } else {
      this.addNoteForm.value.image = this.addNoteForm.value.image;
    }
    if (this.addNoteForm.valid) {
      this.submitted.emit(this.addNoteForm.value);
    } else {
      this.alertify.presentToast('Please add a note.', 'error');
    }
  }
  verifyImage(): void {
    const file: File = this.photoInput.nativeElement.files[0];
    if (
      (file.size < 100_000 && file.type == 'image/png') ||
      file.type == 'image/jpg'
    ) {
      this.imageFile = file;
    } else {
      this.imageFile = false;
      this.alertify.presentToast(
        'Your photo should either be in .png or .jpg and less than 100kb'
      );
      this.photoInput.nativeElement.value = '';
    }
  }
}
