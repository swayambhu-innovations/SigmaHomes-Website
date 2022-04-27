import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
declare const UIkit: any;

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];
  currentViewCustomer: any;
  editMode: boolean = false;
  currentEditId: string = '';

  customerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    bookingDate: new FormControl('', [Validators.required]),
    projectName: new FormControl('', [Validators.required]),
    unitNo: new FormControl('', [Validators.required]),
    propertyType: new FormControl('', [Validators.required]),
    companySalesValue: new FormControl('', [Validators.required]),
    salesValue: new FormControl('', [Validators.required]),
    advanceValue: new FormControl('', [Validators.required]),
    financeDetails: new FormControl('', [Validators.required]),
    paymentMode: new FormControl('', [Validators.required]),
    jobType: new FormControl('', [Validators.required]),
    companyName: new FormControl('', [Validators.required]),
    monthlySalary: new FormControl('', [Validators.required]),
    firmName: new FormControl('', [Validators.required]),
    yearOfEstablishment: new FormControl('', [Validators.required]),
    incomeAsPerITR: new FormControl('', [Validators.required]),
    itrStatus: new FormControl('', [Validators.required]),
  });

  @ViewChild('photoInput') photoInput: ElementRef;

  constructor(
    private databaseService: DatabaseService,
    private alertify: AlertsAndNotificationsService,
    private dataProvider: DataProvider
  ) {}

  viewCustomer(customer: any) {
    this.currentViewCustomer = customer;
    UIkit.modal(document.getElementById('view-customer-modal')).show();
  }

  editCustomer(customer: any) {
    this.editMode = true;
    this.currentEditId = customer.id;
    this.customerForm.patchValue(customer);
    document
      .getElementById('edit-or-add-customer-modal')
      ?.addEventListener('hidden', () => {
        this.editMode = false;
        this.currentEditId = '';
        this.customerForm.reset();
      });
    UIkit.modal(document.getElementById('edit-or-add-customer-modal')).show();
  }

  deleteCustomer(customer: any) {
    if (
      customer.id &&
      confirm('Are you sure you want to delete this customer?')
    ) {
      this.dataProvider.pageSetting.blur = true;
      this.databaseService
        .deleteCustomer(customer.id)
        .then(() => {
          this.dataProvider.pageSetting.blur = false;
          this.alertify.presentToast('Customer Deleted Successfully');
        })
        .catch((error) => {
          this.dataProvider.pageSetting.blur = false;
          this.alertify.presentToast(error.message, 'error', 5000);
        });
    }
  }

  validateProfilePhoto() {
    const file = this.photoInput.nativeElement.files[0];

    if (!['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) {
      this.alertify.presentToast('Your photo should either be in .png or .jpg');
      this.photoInput.nativeElement.value = '';
      return false;
    }

    if (file.size > 100_000) {
      this.alertify.presentToast("Your photo's size should not exceed 100 KB");
      this.photoInput.nativeElement.value = '';
      return false;
    }

    return true;
  }

  uploadProfilePhoto() {
    if (this.validateProfilePhoto()) {
      const file = this.photoInput.nativeElement.files[0];
      // this.databaseService
      //   .upload('customers/' + this.dataProvider.userData?.userId, file)
      //   .then((url: string) => {
      //     this.databaseService
      //       .updateUserImage(url, this.dataProvider.userData?.userId || '')
      //       .then(() => {
      //         this.alertify.presentToast('Image updated');
      //       });
      //   })
      //   .catch((error) => {
      //     this.alertify.presentToast(error);
      //   });
    }
  }

  submitCustomerForm() {
    if (this.editMode) {
      if (this.customerForm.valid && this.currentEditId) {
        if (this.photoInput.nativeElement.files.length == 1) {
          this.uploadProfilePhoto();
        }
        this.dataProvider.pageSetting.blur = true;
        this.databaseService
          .updateCustomer(this.currentEditId, this.customerForm.value)
          .then(() => {
            this.editMode = false;
            UIkit.modal(
              document.getElementById('edit-or-add-customer-modal')
            ).hide();
            this.customerForm.reset();
            this.dataProvider.pageSetting.blur = false;
            this.alertify.presentToast(
              "Customer's details updated successfully"
            );
          })
          .catch((error) => {
            this.dataProvider.pageSetting.blur = false;
            this.alertify.presentToast(error.message, 'error', 5000);
          });
      }
    } else {
      if (this.customerForm.valid) {
        this.dataProvider.pageSetting.blur = true;
        this.databaseService
          .addCustomer(this.customerForm.value)
          .then(() => {
            UIkit.modal(
              document.getElementById('edit-or-add-customer-modal')
            ).hide();
            this.customerForm.reset();
            this.dataProvider.pageSetting.blur = false;
            this.alertify.presentToast('Customer Added Successfully');
          })
          .catch((error) => {
            this.dataProvider.pageSetting.blur = false;
            this.alertify.presentToast(error.message, 'error', 5000);
          });
      }
    }
  }

  ngOnInit(): void {
    this.databaseService.getCustomers().subscribe((data) => {
      this.customers = [];
      data.forEach((user: any) => {
        let data = user.data();
        data.id = user.id;
        this.customers.push(data);
      });
    });
  }
}
