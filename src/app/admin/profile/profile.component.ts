import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    public dataProvider: DataProvider,
    private alertService: AlertsAndNotificationsService,
    private databaseService: DatabaseService
  ) {}

  editMode: boolean = false;

  goToEditMode() {
    this.editMode = true;
  }

  uploadProfilePhoto(event: any) {
    const target = event.target;
    const file = target.files[0];

    if (!['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) {
      this.alertService.presentToast(
        'Your photo should either be in .png or .jpg'
      );
      target.value = '';
      return;
    }
    if (file.size > 100_000) {
      this.alertService.presentToast(
        "Your photo's size should not exceed 100 KB"
      );
      target.value = '';
      return;
    }

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

  editForm: FormGroup = new FormGroup({
    displayName: new FormControl(
      this.dataProvider.userData?.displayName || '',
      [Validators.required]
    ),
    phoneNumber: new FormControl(this.dataProvider.userData?.phoneNumber || ''),
    qualification: new FormControl(
      this.dataProvider.userData?.qualification || ''
    ),
    dob: new FormControl(this.dataProvider.userData?.dob || ''),
    panNo: new FormControl(this.dataProvider.userData?.panNo || ''),
    address: new FormControl(this.dataProvider.userData?.address || ''),
    bankName: new FormControl(this.dataProvider.userData?.bankName || ''),
    fatherName: new FormControl(this.dataProvider.userData?.fatherName || ''),
    branch: new FormControl(this.dataProvider.userData?.branch || ''),
    accountNo: new FormControl(this.dataProvider.userData?.accountNo || ''),
    ifscCode: new FormControl(this.dataProvider.userData?.ifscCode || ''),
    parentEmployee: new FormControl(
      this.dataProvider.userData?.parentEmployee || ''
    ),
    userType: new FormControl(this.dataProvider.userData?.userType || ''),
  });

  saveEdit() {
    if (confirm('Are you sure?') && this.editForm.valid) {
      this.editMode = false;
      this.databaseService.updateUserData(this.editForm.value, this.dataProvider.userData!.userId);
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
