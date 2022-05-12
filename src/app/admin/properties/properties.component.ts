import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
declare const UIkit: any;
@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss'],
})
export class PropertiesComponent implements OnInit {
  properties: any[] = [];
  imageValue: any;

  @ViewChild('photoInput') photoInput: ElementRef;

  propertyForm: FormGroup = new FormGroup({
    image: new FormControl(null, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    plotNo: new FormControl('', [Validators.required]),
    plotArea: new FormControl(0, [Validators.required]),
    flatArea: new FormControl(0, [Validators.required]),
    flatType: new FormControl('', [Validators.required]),
    companySalesValue: new FormControl(0, [Validators.required]),
    companyAcceptedRate: new FormControl('', [Validators.required]),
    companyAcceptedValue: new FormControl('', [Validators.required]),
  });

  constructor(
    private dataProvider: DataProvider,
    private databaseService: DatabaseService,
    private alertify: AlertsAndNotificationsService
  ) {}

  submitPropertyForm() {
    if (confirm('Are you sure ?') && this.propertyForm.valid) {
      if (
        this.imageValue.target.files[0].size < 1000_000 &&
        (this.imageValue.target.files[0].type === 'image/jpeg' ||
          this.imageValue.target.files[0].type === 'image/png')
      ) {
        this.dataProvider.pageSetting.blur = true;
        this.databaseService
          .upload(
            'propertyImages/' +
              this.propertyForm.value.name +
              '/' +
              this.imageValue.target.files[0].name,
            this.imageValue.target.files[0]
          )
          .then((url) => {
            this.propertyForm.value.image = url;
            this.propertyForm.value.rating = 0;
            this.databaseService
              .addProperty(this.propertyForm.value)
              .then((res) => {
                this.alertify.presentToast('Property Added Successfully');
                this.dataProvider.pageSetting.blur = false;
              })
              .catch((err) => {
                this.alertify.presentToast(err);
              })
              .finally(() => {
                UIkit.modal(
                  document.getElementById('add-property-modal')
                ).hide();
              });
          });
      } else {
        this.alertify.presentToast(
          'Invalid Image, Image should be less than 1MB and should be in jpeg or png format',
          'error',
          10000
        );
      }
    } else {
      this.alertify.presentToast('Please Fill All Fields');
    }
  }

  ngOnInit(): void {
    this.databaseService.getProperties().subscribe((data: any) => {
      this.properties = [];
      data.forEach((element: any) => {
        this.properties.push(element.data());
      });
    });
  }
}