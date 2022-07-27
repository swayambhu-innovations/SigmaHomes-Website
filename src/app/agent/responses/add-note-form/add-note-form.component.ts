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
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './add-note-form.component.html',
  styleUrls: ['./add-note-form.component.scss'],
})
export class AddNoteFormComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  file: File | null;
  @Output() noteAdded: EventEmitter<any> = new EventEmitter();

  constructor(
    private alertify: AlertsAndNotificationsService,
    private databaseService: DatabaseService,
    private dataProvider: DataProvider,
    @Inject(MAT_DIALOG_DATA) private data: { responseId: string }
  ) {}

  ngOnInit(): void {}

  addNoteForm: FormGroup = new FormGroup({
    note: new FormControl('', [Validators.required]),
    file: new FormControl(null),
  });

  validateFile() {
    if (
      this.fileInput &&
      this.fileInput.nativeElement &&
      this.fileInput.nativeElement.files &&
      this.fileInput.nativeElement.files.length
    ) {
      this.file = this.fileInput.nativeElement.files[0];
      if (this.file!.size > 10_000_000) {
        this.alertify.presentToast("Your file's size should be at most 10 MB");
        this.file = null;
        this.fileInput.nativeElement.value = '';
      }
    }
  }

  async submit() {
    if (this.addNoteForm.valid) {
      // check for file, if it exists, upload it and get its url
      if (this.file) {
        this.dataProvider.pageSetting.blur = true;
        await this.databaseService
          .upload(
            `noteFiles/${this.data.responseId}/${this.file.name}`,
            this.file
          )
          .then((url) => {
            this.addNoteForm.patchValue({
              file: url,
            });
            this.dataProvider.pageSetting.blur = false;
          });
      }

      this.noteAdded.emit({
        ...this.addNoteForm.value,
        date: Timestamp.now(),
        addedBy: this.dataProvider.userID,
        addedByName: this.dataProvider.userData?.displayName,
        addedByAccess: 'Agent',
      });
    }
  }
}
