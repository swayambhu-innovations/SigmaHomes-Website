import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.scss'],
})
export class BroadcastComponent implements OnInit {
  constructor(private alertService: AlertsAndNotificationsService) {}

  @ViewChild('uploadPostWrapper') uploadPostWrapper: ElementRef;
  @ViewChild('postInput') postInput: ElementRef;
  @ViewChild('csvInput') csvInput: ElementRef;

  imageSelected() {
    var selectionIsValid = true;
    const file = this.postInput.nativeElement.files[0];

    if (this.postInput.nativeElement.files.length != 1) {
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

  ngOnInit(): void {}
}
