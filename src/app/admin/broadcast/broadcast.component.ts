import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.scss'],
})
export class BroadcastComponent implements OnInit {
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
    console.log((this.broadcastForm.get('subject')?.value.trim()))
    console.log((this.broadcastForm.get('text')?.value.trim()))

    if (this.broadcastForm.get('subject')?.value.trim() == '' && this.broadcastForm.get('text')?.value.trim() == '') {
      this.alertService.presentToast('Subject and text both cannot be empty', 'error');
      isValid = false;
    }

    if (!isValid) {
      return;
    }
  }

  ngOnInit(): void {}
}
