import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
declare const UIkit: any;

@Component({
  selector: 'app-type-modal',
  templateUrl: './type-modal.component.html',
  styleUrls: ['../property-modals.scss'],
})
export class TypeModalComponent implements OnInit {
  @Input() projects: any[] = [];
  @Input() typeToEdit: any = null;
  @Input() projectId: string | null = null;

  typeForm: FormGroup = new FormGroup({
    project: new FormControl(null, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    photos: new FormControl([]),
    area: new FormControl(0),
    companySalesValue: new FormControl(0),
    companySalesRate: new FormControl(0),
    companyAcceptedValue: new FormControl(0),
    companyAcceptedRate: new FormControl(0),
  });

  constructor(
    private dataProvider: DataProvider,
    private databaseService: DatabaseService,
    private alertService: AlertsAndNotificationsService
  ) {}

  ngOnInit(): void {
    if (this.projectId) {
      this.typeForm.patchValue({
        project: this.projectId,
      });
    }
  }

  validatePhotos(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      for (var i = 0; i < files.length; i++) {
        const file = files[i];
        var fileIsValid = false;
        if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
          this.alertService.presentToast(
            'Only png, jpeg and jpg images are allowed',
            'error'
          );
        } else if (file.size >= 1_000_000) {
          this.alertService.presentToast(
            "Each image's size must be less than 1 MB",
            'error'
          );
        } else {
          fileIsValid = true;
        }
        if (!fileIsValid) {
          target.value = '';
          return;
        }
      }
    }
  }

  async submitTypeForm() {
    if (this.typeForm.valid) {
      this.dataProvider.pageSetting.blur = true;

      // Upload photos
      const typePhotosInput = document.getElementById(
        'type-photos-input'
      ) as HTMLInputElement;
      if (
        typePhotosInput &&
        typePhotosInput.files &&
        typePhotosInput.files.length > 0
      ) {
        this.typeForm.value.photos = [];
        for (var i = 0; i < typePhotosInput.files.length; i++) {
          await this.databaseService
            .upload('types/' + new Date().getTime(), typePhotosInput.files[i])
            .then((url) => {
              this.typeForm.value.photos.push(url);
            });
        }
      } else {
        this.typeForm.removeControl('photos');
      }

      if (this.typeToEdit) {
        await this.databaseService.editType(
          this.typeToEdit.id,
          this.typeForm.value
        );
      } else {
        await this.databaseService.addType(this.typeForm.value);
      }

      const typeModal = UIkit.modal(document.getElementById('type-modal'));
      typeModal.hide();
      this.typeForm.reset();
      typePhotosInput.value = '';
      location.reload();
      this.dataProvider.pageSetting.blur = false;

      if (this.typeToEdit) {
        this.alertService.presentToast('Type edited successfully', 'info');
      } else {
        this.alertService.presentToast('Type added successfully', 'info');
      }
    } else {
      this.alertService.presentToast(
        'Please fill all the required fields',
        'error'
      );
    }
  }
}
