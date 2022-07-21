import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { DatabaseService } from 'src/app/services/database.service';
import Fuse from 'fuse.js';
import { ActivatedRoute, Router } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-new-broadcast',
  templateUrl: './new-broadcast.component.html',
  styleUrls: ['./new-broadcast.component.scss', '../../admin.util.scss'],
})
export class NewBroadcastComponent implements OnInit {
  @ViewChild('imageSelector') photoInput: ElementRef;

  recipients: string[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;
  imageFile: File | false;
  customers: any[];
  filteredCustomers: any[];
  more = false;
  broadcastForm: FormGroup = new FormGroup({
    image: new FormControl(''),
    subject: new FormControl(''),
    text: new FormControl(''),
  });
  customerControl = new FormControl();
  constructor(
    private alertService: AlertsAndNotificationsService,
    private broadcastService: BroadcastService,
    private databaseService: DatabaseService,
    private router: Router,
    private route: ActivatedRoute,
    private dataProvider: DataProvider
  ) {
    this.customerControl.valueChanges.pipe(
      startWith(null),
      map((room: string | null) =>
        room ? this._filter(room) : this.customers.slice()
      )
    );
  }

  ngOnInit(): void {
    // If "send a new broadcast to these recipients" is cliecked
    this.recipients = this.broadcastService.getRecipients();

    // If "resend broadcast" is clicked
    const broadcast = this.broadcastService.getBroadcast();
    if (broadcast) {
      this.broadcastForm.patchValue(broadcast);
      document.documentElement.style.setProperty(
        '--post-background',
        `url('${broadcast.image}')`
      );
      this.recipients = broadcast.recipients;
    }

    // Get customers from the database
    this.databaseService.getCustomersPromise().then((docs: any) => {
      this.customers = [];
      docs.forEach((doc: any) => {
        this.customers.push({ id: doc.id, ...doc.data() });
      });
      this.customers.forEach((customer: any) => {
        console.log('Customer', customer);
      });
      this.filteredCustomers = [];
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    let returnResponse: any = [];
    this.customers.forEach((customer: any) => {
      if (customer.name.toLowerCase().includes(filterValue)) {
        returnResponse.push(customer);
      }
    });
    return returnResponse;
  }
  toggleMore(){
    this.more = ! this.more;
  }
  remove(data: any) {
    this.filteredCustomers.forEach((customer: any, index: number) => {
      if (data.id === customer.id) {
        this.filteredCustomers.splice(index, 1);
        this.customers.push(customer);
      }
    });
  }

  add(event: any) {
    console.log(event);
  }

  selected(event: any) {
    this.customers.forEach((customer: any, index: number) => {
      if (event.option.value === customer.id) {
        this.filteredCustomers.push(customer);
        this.customers.splice(index, 1);
      }
    });
  }

  verifyImage(): void {
    const file: File = this.photoInput.nativeElement.files[0];
    if (
      (file.size < 100_000 && file.type == 'image/png') ||
      file.type == 'image/jpg'
    ) {
      this.imageFile = file;
    } else {
      this.imageFile = false;
      this.alertService.presentToast(
        'Your photo should either be in .png or .jpg and less than 100kb'
      );
      this.photoInput.nativeElement.value = '';
    }
  }

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
      this.photoInput.nativeElement.value = '';
      selectionIsValid = false;
    } else if (file.size > 100_000) {
      this.alertService.presentToast(
        "Your photo's size should not exceed 100 KB"
      );
      this.photoInput.nativeElement.value = '';
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

  uploadCSV(event: Event) {
    event.preventDefault();
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.click();
    input.onchange = () => {
      if (input.files && input.files.length === 1) {
        const file = input.files[0];
        if (file.name.endsWith('.csv')) {
          const reader = new FileReader();
          reader.readAsText(file);
          reader.onload = () => {
            const csvData = reader.result;
            const csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
            for (var i = 1; i < csvRecordsArray.length; i++) {
              const record = csvRecordsArray[i].trim();
              if (record) {
                this.recipients.push(record);
              }
            }
          };
        } else {
          this.alertService.presentToast('Please upload a .csv file');
        }
      }
      input.value = '';
    };
  }

  addRecipient(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.recipients.push(value);
    }
    event.chipInput!.clear();
  }

  removeRecipient(recipient: any): void {
    const index = this.recipients.indexOf(recipient);
    if (index != -1) {
      this.recipients.splice(index, 1);

      // deselect the customer if recipient is a customer
      this.customers.forEach((customer) => {
        if (
          this.formatCustomerAsRecipient(customer) == this.recipients[index]
        ) {
          this.toggleCustomerSelection(customer.id);
        }
      });
    }
  }

  // searchCustomers(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   const query = input.value.trim();
  //   if (query.length > 0) {
  //     const options = { keys: ['name'] };
  //     const fuse = new Fuse(this.customers, options);
  //     const results = fuse.search(query);
  //     this.filteredCustomers = [];
  //     results.forEach((result: any) => {
  //       this.filteredCustomers.push(result.item);
  //     });
  //   } else {
  //     this.filteredCustomers = this.customers;
  //   }
  // }

  formatCustomerAsRecipient(customer: any): string {
    return `${customer.name} (${customer.phone}, ${customer.email})`;
  }

  toggleCustomerSelection(customerId: string) {
    const customer = this.customers.find(
      (customer) => customer.id === customerId
    );
    const recipient = this.formatCustomerAsRecipient(customer);
    const index = this.recipients.indexOf(recipient);
    if (index !== -1) {
      this.recipients.splice(index, 1);
    } else {
      this.recipients.push(recipient);
    }
  }

  async submitBroadcastForm() {
    // Validation
    if (this.broadcastForm.get('subject')?.value.trim() == '') {
      this.alertService.presentToast(
        'Please enter the subject of your broadcast',
        'error'
      );
    } else if (this.recipients.length < 1) {
      this.alertService.presentToast('Please enter recipients', 'error');
    } else {
      // Upload the image if an image is selected
      this.dataProvider.pageSetting.blur = true;

      if (this.photoInput.nativeElement.files.length === 1) {
        const file = this.photoInput.nativeElement.files[0];
        await this.databaseService
          .upload(
            'broadcastImages/' +
              this.broadcastForm.value.subject +
              '/' +
              file.name,
            file
          )
          .then((url) => {
            this.broadcastForm.patchValue({ image: url });
          });
      }

      this.broadcastForm.patchValue({ recipients: this.recipients });

      // Send broadcast
      this.broadcastService.sendBroadcast(this.broadcastForm.value);

      // Upload Broadcast to the list of broadcasts
      this.databaseService
        .addBroadcast(this.broadcastForm.value)
        .then(() => {
          this.dataProvider.pageSetting.blur = false;
          this.alertService.presentToast('Broadcast sent successfully');
          this.router.navigate(['..'], { relativeTo: this.route });
        })
        .catch((error) => {
          this.dataProvider.pageSetting.blur = false;
          this.alertService.presentToast(error.message, 'error', 5000);
          this.router.navigate(['..'], { relativeTo: this.route });
        });
    }
  }
}
