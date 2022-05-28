import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
declare const UIkit: any;

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss', './properties.modal.scss'],
})
export class PropertiesComponent implements OnInit {
  properties: any[] = [];
  editMode: boolean = false;
  currentEditId: string = '';
  currentViewProperty: any;
  imagesValue: any;

  propertyForm: FormGroup = new FormGroup({
    images: new FormControl([]),
    name: new FormControl('', [Validators.required]),
    plotNo: new FormControl('', [Validators.required]),
    plotArea: new FormControl(0, [Validators.required]),
    flatArea: new FormControl(0, [Validators.required]),
    flatType: new FormControl('', [Validators.required]),
    companySalesValue: new FormControl(0, [Validators.required]),
    companyAcceptedRate: new FormControl('', [Validators.required]),
    companyAcceptedValue: new FormControl('', [Validators.required]),
    furnishing: new FormControl('', [Validators.required]),
    facilitiesNearby: new FormControl('', [Validators.required]),
    distanceFromImportantLocations: new FormControl('', [Validators.required]),
    rentingCost: new FormControl('', [Validators.required]),
    fullFurnishingCost: new FormControl('', [Validators.required]),
    reraStatus: new FormControl('', [Validators.required]),
    otherDetails: new FormControl(''),
  });

  constructor(
    private dataProvider: DataProvider,
    private databaseService: DatabaseService,
    private alertify: AlertsAndNotificationsService
  ) {}

  ngOnInit() {
    this.databaseService.getAllProperties().subscribe((data: any) => {
      this.properties = [];
      data.forEach((element: any) => {
        const property = { id: element.id, ...element.data() };
        this.properties.push(property);
      });
    });
  }

  viewProperty(property: any): void {
    this.currentViewProperty = property;
    UIkit.modal(document.getElementById('view-property-modal')).show();
  }

  editProperty(property: any): void {
    this.editMode = true;
    this.currentEditId = property.id;
    this.propertyForm.patchValue(property);
    document
      .getElementById('edit-or-add-property-modal')
      ?.addEventListener('hidden', () => {
        this.editMode = false;
        this.currentEditId = '';
        this.propertyForm.reset();
        (document.getElementById('images-input') as HTMLInputElement).value =
          '';
      });
    UIkit.modal(document.getElementById('edit-or-add-property-modal')).show();
  }

  deleteProperty(property: any): void {
    if (
      property.id &&
      confirm('Are you sure you want to delete this property?')
    ) {
      this.dataProvider.pageSetting.blur = true;
      this.databaseService
        .deleteProperty(property.id)
        .then(() => {
          this.dataProvider.pageSetting.blur = false;
          this.alertify.presentToast('Property Deleted Successfully');
        })
        .catch((error) => {
          this.dataProvider.pageSetting.blur = false;
          this.alertify.presentToast(error.message, 'error', 5000);
        });
    }
  }

  async uploadImages(files: any): Promise<any[]> {
    const imageUrls: any[] = [];
    for (const file of files) {
      await this.databaseService
        .upload(
          'propertyImages/' + this.propertyForm.value.name + '/' + file.name,
          file
        )
        .then((url) => {
          imageUrls.push(url);
        });
    }
    return imageUrls;
  }

  async submitPropertyForm() {
    const editOrAddPropertyModal = UIkit.modal(
      document.getElementById('edit-or-add-property-modal')
    );

    // Validate the images
    const imageFiles = this.imagesValue ? this.imagesValue.target.files : [];
    if (imageFiles && imageFiles.length > 0) {
      for (const file of imageFiles) {
        if (
          file.size > 1000_000 &&
          file.type !== 'image/jpeg' &&
          file.type !== 'image/png'
        ) {
          editOrAddPropertyModal.hide();
          this.alertify.presentToast(
            'Each image should be less than 1MB and should be in jpeg or png format',
            'error',
            10000
          );
          return;
        }
      }
    }

    // if form and images both are valid
    if (this.propertyForm.valid) {
      this.dataProvider.pageSetting.blur = true;

      if (!this.editMode || imageFiles.length > 0) {
        // Upload the images, then get the image urls and set it to the form control
        await this.uploadImages(imageFiles).then((imageUrls) => {
          this.propertyForm.patchValue({ images: imageUrls });
        });
      }

      // If in edit mode, update property
      if (this.editMode) {
        // If no photos are selected, we don't need to include the images form control
        if (imageFiles.length === 0) {
          this.propertyForm.removeControl('images');
        }

        this.databaseService
          .updateProperty(this.currentEditId, this.propertyForm.value)
          .then(() => {
            editOrAddPropertyModal.hide();
            this.dataProvider.pageSetting.blur = false;
            this.alertify.presentToast('Property updated successfully');
          })
          .catch((error) => {
            editOrAddPropertyModal.hide();
            this.dataProvider.pageSetting.blur = false;
            this.alertify.presentToast(error.message, 'error', 5000);
          });
      }
      // If not in edit mode, add property
      else {
        this.databaseService
          .addProperty(this.propertyForm.value)
          .then(() => {
            editOrAddPropertyModal.hide();
            this.dataProvider.pageSetting.blur = false;
            this.alertify.presentToast('Property added successfully');
            this.propertyForm.reset();
            (
              document.getElementById('images-input') as HTMLInputElement
            ).value = '';
          })
          .catch((error) => {
            editOrAddPropertyModal.hide();
            this.dataProvider.pageSetting.blur = false;
            this.alertify.presentToast(error.message, 'error', 5000);
            this.propertyForm.reset();
            (
              document.getElementById('images-input') as HTMLInputElement
            ).value = '';
          });
      }
    }
    // if form not valid
    else {
      editOrAddPropertyModal.hide();
      this.alertify.presentToast('Please fill all the fields', 'error', 7000);
    }
  }
}
