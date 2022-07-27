import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import Fuse from 'fuse.js';
import { CSVService } from 'src/app/services/csv.service';
import { ActivatedRoute, Router } from '@angular/router';
declare const UIkit: any;

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customers: any[];
  filteredCustomers: any[];
  currentViewCustomer: any;
  editMode: boolean = false;
  currentEditId: string = '';
  openModal: any;

  customerForm: FormGroup = new FormGroup({
    img: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required]),
    aadharNo: new FormControl('', [Validators.required]),
    panNo: new FormControl('', [Validators.required]),
    customerDob: new FormControl('', [Validators.required]),
    customerAnniversary: new FormControl('', [Validators.required]),
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
    private dataProvider: DataProvider,
    private dataTransferService: DataTransferService,
    private csvService: CSVService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activateRoute.queryParams.subscribe((data: any) => {
      if (data.openModal === 'true') {
        this.openModal = data.openModal;
        UIkit.modal(
          document.getElementById('edit-or-add-customer-modal')
        ).show();
      } else {
        this.openModal = 'false';
      }
    });
  }

  ngOnInit(): void {
    if (this.openModal === 'true') {
      UIkit.modal(document.getElementById('edit-or-add-customer-modal')).show();
    }
    this.databaseService.getCustomersPromise().then((data) => {
      this.customers = [];

      data.forEach((user: any) => {
        let customer = user.data();
        customer.id = user.id;
        this.customers.push(customer);
      });

      this.filteredCustomers = this.customers;
    });

    // make lead a8 customer
    const lead = this.dataTransferService.getLead();
    if (lead) {
      this.customerForm.addControl('leadId', new FormControl(lead.id));
      this.customerForm.patchValue(lead);

      // Patching dates (gets tricky)
      const dobDate = new Date(lead.customerDob);
      const dobFormat =
        String(dobDate.getFullYear()).padStart(4, '0') +
        '-' +
        String(dobDate.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(dobDate.getDate()).padStart(2, '0');
      this.customerForm.patchValue({ customerDob: dobFormat });

      const anniversaryDate = new Date(lead.customerAnniversary);
      const anniversaryFormat =
        String(anniversaryDate.getFullYear()).padStart(4, '0') +
        '-' +
        String(anniversaryDate.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(anniversaryDate.getDate()).padStart(2, '0');
      this.customerForm.patchValue({ customerAnniversary: anniversaryFormat });

      const modal = document.getElementById('edit-or-add-customer-modal');
      if (modal) {
        UIkit.modal(modal).show();
        modal.addEventListener('hidden', () => {
          this.customerForm.removeControl('leadId');
          this.customerForm.reset();
          this.dataTransferService.clearLead();
        });
      }
    }
  }

  ngAfterViewInit(): void {
    // Search customers
    const customerSearchInput = document.getElementById(
      'customer-search-input'
    ) as HTMLInputElement;
    if (customerSearchInput) {
      customerSearchInput.oninput = () => {
        const query = customerSearchInput.value.trim();
        if (query.length > 0) {
          const options = { keys: ['name'] };
          const fuse = new Fuse(this.customers, options);
          const results = fuse.search(query);
          this.filteredCustomers = [];
          results.forEach((result: any) => {
            this.filteredCustomers.push(result.item);
          });
        } else {
          this.filteredCustomers = this.customers;
        }
      };
    }

    // import customers
    const importCustomers = document.getElementById('import-customers');
    if (importCustomers) {
      importCustomers.addEventListener(
        'click',
        () => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = '.csv';
          input.click();
          input.onchange = () => {
            this.dataProvider.pageSetting.blur = true;
            if (input.files && input.files[0]) {
              this.csvService.load(input.files[0]);
              setTimeout(async () => {
                const customers = this.csvService.import();
                for (const customer of customers) {
                  await this.databaseService.addCustomer(customer);
                }
                input.value = '';
                this.dataProvider.pageSetting.blur = false;
                this.alertify.presentToast(
                  'Customers added successfully',
                  'info'
                );
              }, 1000);
            }
          };
        },
        false
      );
    }

    // export customers
    const exportCustomers = document.getElementById('export-customers');
    if (exportCustomers) {
      exportCustomers.addEventListener(
        'click',
        () => {
          if (this.customers.length > 0) {
            const keys = Object.keys(this.customers[0]);
            const csvData = [keys];
            this.customers.forEach((customer) => {
              const values = [];
              for (const key of keys) {
                values.push(customer[key]);
              }
              csvData.push(values);
            });
            this.csvService.export(csvData, 'customers');
          } else {
            this.alertify.presentToast('No customers to export', 'error');
          }
        },
        false
      );
    }
  }

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
        this.photoInput.nativeElement = '';
      });
    UIkit.modal(document.getElementById('edit-or-add-customer-modal')).show();
    this.photoInput.nativeElement = '';
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

  async uploadProfilePhoto() {
    if (this.validateProfilePhoto()) {
      const file = this.photoInput.nativeElement.files[0];
      return await this.databaseService.upload(
        'customerImages/' + this.customerForm.value.name + '/' + file.name,
        file
      );
    }
  }

  async submitCustomerForm() {
    if (this.editMode) {
      if (this.customerForm.valid && this.currentEditId) {
        if (
          this.photoInput.nativeElement.files &&
          this.photoInput.nativeElement.files.length == 1
        ) {
          const url = await this.uploadProfilePhoto();
          this.customerForm.patchValue({ img: url });
          this.photoInput.nativeElement = '';
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
            this.customerForm.reset();
            this.dataProvider.pageSetting.blur = false;
            this.alertify.presentToast(error.message, 'error', 5000);
          });
      }
    } else {
      if (this.customerForm.valid) {
        this.dataProvider.pageSetting.blur = true;

        // If there is a lead id, delete the lead and remove the lead id form control
        const leadId = this.customerForm.value.leadId;
        if (leadId) {
          this.databaseService.deleteLead(leadId).then(() => {
            this.customerForm.removeControl('leadId');
          });
        }

        if (this.photoInput.nativeElement.files.length == 1) {
          const url = await this.uploadProfilePhoto();
          this.customerForm.patchValue({ img: url });
          this.photoInput.nativeElement = '';
        }

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

  createResponse(customerId: string) {
    this.router.navigate(['/admin/responses'], {
      queryParams: {
        openModal: true,
        customerOrLead: 'customer',
        id: customerId,
      },
    });
  }
}
