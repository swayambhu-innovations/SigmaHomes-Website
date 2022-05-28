import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-new-broadcast',
  templateUrl: './new-broadcast.component.html',
  styleUrls: ['./new-broadcast.component.scss', '../../admin.util.scss']
})
export class NewBroadcastComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  recipients: any[] = [];

  addRecipient(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.recipients.push(value);
    }
    event.chipInput!.clear();
  }

  removeRecipient(recipient: any): void {
    const index = this.recipients.indexOf(recipient);
    if (index >= 0) {
      this.recipients.splice(index, 1);
    }
  }

  broadcastForm: FormGroup = new FormGroup({
    image: new FormControl(''),
    subject: new FormControl(''),
    text: new FormControl(''),
    csv: new FormControl(''),
    recipients: new FormControl([]),
    leads: new FormControl([]),
  });

  @ViewChild('photoInput') photoInput: ElementRef;

  constructor(private alertService: AlertsAndNotificationsService) {}

  triggerImageUpload(): void {
    this.photoInput.nativeElement.click();
  }

  imageSelected() {
    var selectionIsValid = true;
    const file = this.photoInput.nativeElement.files[0];

    if (this.photoInput.nativeElement.files.length != 1) {
      selectionIsValid = false;
    } else if (!['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) {
      this.alertService.presentToast(
        'Your photo should either be in .png or .jpg'
      );
      selectionIsValid = false;
    } else if (file.size > 100_000) {
      this.alertService.presentToast(
        "Your photo's size should not exceed 100 KB"
      );
      selectionIsValid = false;
    }

    if (selectionIsValid) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        document.documentElement.style.setProperty(
          '--post-background',
          `url('${fileReader.result}')`
        );
      };
    } else {
      document.documentElement.style.setProperty('--post-background', '');
    }
  }

  submitBroadcastForm() {
    var isValid = true;

    if (
      this.broadcastForm.get('subject')?.value.trim() == '' &&
      this.broadcastForm.get('text')?.value.trim() == ''
    ) {
      this.alertService.presentToast(
        'Subject and text both cannot be empty',
        'error'
      );
      isValid = false;
    }

    if (!isValid) {
      return;
    }
  }

  ngOnInit(): void {
  }

}
