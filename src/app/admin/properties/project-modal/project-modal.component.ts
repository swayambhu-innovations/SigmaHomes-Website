import { L } from '@angular/cdk/keycodes';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
declare const UIkit: any;

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['../property-modals.scss'],
})
export class ProjectModalComponent implements OnInit {
  @Input() projectToEdit: any = null;
  projectForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required]),
    photos: new FormControl([]),
    builderName: new FormControl(''),
    plotArea: new FormControl(0),
    budget: new FormControl(0),
    facilitiesNearby: new FormControl(''),
    distanceFromImportantLocations: new FormControl(''),
    reraStatus: new FormControl(''),
  });

  constructor(
    private dataProvider: DataProvider,
    private databaseService: DatabaseService,
    private alertService: AlertsAndNotificationsService
  ) {}

  ngOnInit(): void {
    if (this.projectToEdit) {
      this.projectForm.patchValue(this.projectToEdit);
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

  async submitProjectForm() {
    if (this.projectForm.valid) {
      this.dataProvider.pageSetting.blur = true;

      // Upload photos
      const projectPhotosInput = document.getElementById(
        'project-photos-input'
      ) as HTMLInputElement;
      if (
        projectPhotosInput &&
        projectPhotosInput.files &&
        projectPhotosInput.files.length > 0
      ) {
        this.projectForm.value.photos = [];
        for (var i = 0; i < projectPhotosInput.files.length; i++) {
          await this.databaseService
            .upload(
              'projects/' + new Date().getTime(),
              projectPhotosInput.files[i]
            )
            .then((url) => {
              this.projectForm.value.photos.push(url);
            });
        }
      } else {
        this.projectForm.removeControl('photos');
      }

      if (this.projectToEdit) {
        await this.databaseService.editProject(
          this.projectToEdit.id,
          this.projectForm.value
        );
      } else {
        await this.databaseService.addProject(this.projectForm.value);
      }

      const projectModal = UIkit.modal(
        document.getElementById('project-modal')
      );
      projectModal.hide();
      this.projectForm.reset();
      (
        document.getElementById('project-photos-input') as HTMLInputElement
      ).value = '';
      location.reload();
      this.dataProvider.pageSetting.blur = false;

      if (this.projectToEdit) {
        this.alertService.presentToast('Project edited successfully', 'info');
      } else {
        this.alertService.presentToast('Project added successfully', 'info');
      }
    } else {
      this.alertService.presentToast(
        'Please fill all the required fields',
        'error'
      );
    }
  }
}
