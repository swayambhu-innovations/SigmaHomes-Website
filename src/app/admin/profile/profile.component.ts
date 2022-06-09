import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { profile } from 'console';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('photoInput') photoInput: ElementRef;
  editMode: boolean = false;

  editForm: FormGroup = new FormGroup({
    displayName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl(),
    qualification: new FormControl(),
    dob: new FormControl(),
    panNo: new FormControl(),
    address: new FormControl(),
    bankName: new FormControl(),
    fatherName: new FormControl(),
    branch: new FormControl(),
    accountNo: new FormControl(),
    ifscCode: new FormControl(),
    parentEmployee: new FormControl(),
    userType: new FormControl(),
  });

  constructor(
    public dataProvider: DataProvider,
    private alertService: AlertsAndNotificationsService,
    private databaseService: DatabaseService
  ) {}

  goToEditMode() {
    this.editMode = true;
    if (this.dataProvider.userData) {
      this.editForm.patchValue(this.dataProvider.userData);
    }
  }

  validateProfilePhoto() {
    const file = this.photoInput.nativeElement.files[0];

    if (!['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) {
      this.alertService.presentToast(
        'Your photo should either be in .png or .jpg'
      );
      this.photoInput.nativeElement.value = '';
      return false;
    }

    if (file.size > 100_000) {
      this.alertService.presentToast(
        "Your photo's size should not exceed 100 KB"
      );
      this.photoInput.nativeElement.value = '';
      return false;
    }

    return true;
  }

  uploadProfilePhoto() {
    if (this.validateProfilePhoto()) {
      const file = this.photoInput.nativeElement.files[0];
      this.databaseService
        .upload('users/' + this.dataProvider.userData?.userId, file)
        .then((url: string) => {
          this.databaseService
            .updateUserImage(url, this.dataProvider.userData?.userId || '')
            .then(() => {
              this.alertService.presentToast('Image updated');
            });
        })
        .catch((error) => {
          this.alertService.presentToast(error);
        });
    }
  }

  saveEdit() {
    if (confirm('Are you sure?') && this.editForm.valid) {
      if (this.photoInput.nativeElement.files.length == 1) {
        this.uploadProfilePhoto();
      }
      this.editMode = false;
      this.databaseService
        .updateUserData(this.editForm.value, this.dataProvider.userData!.userId)
        .then(() => {
          this.alertService.presentToast('Profile updated successfully');
        });
    } else {
      this.alertService.presentToast('Your name is required');
    }
  }

  cancelEdit() {
    this.editMode = false;
  }

  ngOnInit(): void {}
}

export type editFormInfo = {
  displayName: string;
  phoneNumber: string;
  qualification: string;
  dob: string;
  panNo: string;
  address: string;
  bankName: string;
  fatherName: string;
  branch: string;
  accountNo: string;
  ifscCode: string;
  parentEmployee: string;
  userType: string;
};
