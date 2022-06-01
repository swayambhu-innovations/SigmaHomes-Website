import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import Fuse from 'fuse.js';
import { CSVService } from 'src/app/services/csv.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { DataProvider } from 'src/app/providers/data.provider';
declare const UIkit: any;

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.scss'],
})
export class ResponsesComponent implements OnInit {
  viewAs: any = 'cards';

  responses: any[];
  filteredResponses: any[];
  selectedResponses: string[] = [];

  phases: string[] = [
    'Query',
    'Visitation',
    'Negotiation',
    'Legalization',
    'Closure',
  ];

  showCustomerDropdown: boolean = false;
  customers: any[];
  filteredCustomers: any[];

  showPropertyDropdown: boolean = false;
  properties: any[];
  filteredProperties: any[];

  addResponseForm: FormGroup = new FormGroup({
    customer: new FormControl('', [Validators.required]),
    property: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private csvService: CSVService,
    private alertify: AlertsAndNotificationsService,
    private dataProvider: DataProvider
  ) {}

  ngOnInit(): void {
    // get all responses
    this.databaseService.getResponses().subscribe((data: any) => {
      this.responses = [];
      data.forEach(async (element: any) => {
        const response = {
          id: element.id,
          customer: (
            await this.databaseService.getCustomer(element.data().customer)
          ).data(),
          property: (
            await this.databaseService.getProperty(element.data().property)
          ).data(),
          phase: this.phases[element.data().phase],
        };
        this.responses.push(response);
      });
      this.filteredResponses = this.responses;
    });

    // Get all customers
    this.databaseService.getCustomers().subscribe((docs: any) => {
      this.customers = [];
      docs.forEach((doc: any) => {
        this.customers.push({ id: doc.id, ...doc.data() });
      });
      this.filteredCustomers = this.customers;
    });

    // Get all properties
    this.databaseService.getAllProperties().subscribe((docs: any) => {
      this.properties = [];
      docs.forEach((doc: any) => {
        this.properties.push({ id: doc.id, ...doc.data() });
      });
      this.filteredProperties = this.properties;
    });
  }

  ngAfterViewInit(): void {
    // Search responses
    const responseSearchInput = document.getElementById(
      'response-search-input'
    ) as HTMLInputElement;
    if (responseSearchInput) {
      responseSearchInput.oninput = () => {
        const query = responseSearchInput.value.trim();
        if (query.length > 0) {
          const options = { keys: ['customer.name', 'property.name'] };
          const fuse = new Fuse(this.responses, options);
          const results = fuse.search(query);
          this.filteredResponses = [];
          results.forEach((result: any) => {
            this.filteredResponses.push(result.item);
          });
        } else {
          this.filteredResponses = this.responses;
        }
      };
    }

    // import responses
    // const importResponses = document.getElementById('import-responses');
    // if (importResponses) {
    //   importResponses.addEventListener(
    //     'click',
    //     () => {
    //       const input = document.createElement('input');
    //       input.type = 'file';
    //       input.accept = '.csv';
    //       input.click();
    //       input.onchange = () => {
    //         this.dataProvider.pageSetting.blur = true;
    //         if (input.files && input.files[0]) {
    //           this.csvService.load(input.files[0]);
    //           setTimeout(async () => {
    //             const responses = this.csvService.import();
    //             for (const response of responses) {
    //               delete response.phases;
    //               await this.databaseService.addResponse(response);
    //             }
    //             input.value = '';
    //             this.dataProvider.pageSetting.blur = false;
    //             this.alertify.presentToast(
    //               'Responses added successfully',
    //               'info'
    //             );
    //           }, 1000);
    //         }
    //       };
    //     },
    //     false
    //   );
    // }

    // export responses
    // const exportResponses = document.getElementById('export-responses');
    // if (exportResponses) {
    //   exportResponses.addEventListener(
    //     'click',
    //     () => {
    //       if (this.responses.length > 0) {
    //         const keys = Object.keys(this.responses[0]).filter(
    //           (key) => key !== 'phases'
    //         );
    //         const csvData = [keys];
    //         this.responses.forEach((response) => {
    //           const values = [];
    //           for (const key of keys) {
    //             values.push(response[key]);
    //           }
    //           csvData.push(values);
    //         });
    //         this.csvService.export(csvData, 'responses');
    //       } else {
    //         this.alertify.presentToast('No responses to export', 'error');
    //       }
    //     },
    //     false
    //   );
    // }

    // Set up "view as"
    const viewResponsesAs = document.getElementById('view-responses-as');
    if (viewResponsesAs) {
      viewResponsesAs.addEventListener(
        'click',
        (event: Event) => {
          var target = event.target as HTMLElement;
          if (target.classList.contains('view-as-btn')) {
            this.viewAs = target.getAttribute('data-view-as');
          } else if (target.parentElement?.classList.contains('view-as-btn')) {
            this.viewAs = target.parentElement.getAttribute('data-view-as');
          }
        },
        false
      );
    }
  }

  toggleResponseSelection(responseId: string) {
    if (this.selectedResponses.includes(responseId)) {
      this.selectedResponses = this.selectedResponses.filter(
        (id) => id !== responseId
      );
    } else {
      this.selectedResponses.push(responseId);
    }
  }

  goToResponsePage(responseId: any) {
    this.router.navigate([responseId], { relativeTo: this.route });
    // this.activePhaseTab = this.responses[index].phase;
  }

  toggleCustomerDropdown(event: Event) {
    event.preventDefault();
    this.showCustomerDropdown = !this.showCustomerDropdown;
  }

  searchCustomers(event: Event) {
    const input = event.target as HTMLInputElement;
    const query = input.value.trim();
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
  }

  selectCustomer(customerId: string) {
    this.showCustomerDropdown = false;
    this.addResponseForm.patchValue({ customer: customerId });
  }

  getCustomerImage(customerId: string): string {
    if (this.customers && this.customers.length > 0) {
      const customer = this.customers.find(
        (customer) => customer.id === customerId
      );
      if (customer && customer.img) {
        return customer.img;
      }
    }
    return 'assets/img/circle-user-solid.svg';
  }

  getCustomerName(customerId: string): string {
    if (this.customers && this.customers.length > 0) {
      const customer = this.customers.find(
        (customer) => customer.id === customerId
      );
      if (customer && customer.name) {
        return customer.name;
      }
    }
    return '';
  }

  togglePropertyDropdown(event: Event) {
    event.preventDefault();
    this.showPropertyDropdown = !this.showPropertyDropdown;
  }

  searchProperties(event: Event) {
    const input = event.target as HTMLInputElement;
    const query = input.value.trim();
    if (query.length > 0) {
      const options = { keys: ['name'] };
      const fuse = new Fuse(this.properties, options);
      const results = fuse.search(query);
      this.filteredProperties = [];
      results.forEach((result: any) => {
        this.filteredProperties.push(result.item);
      });
    } else {
      this.filteredProperties = this.properties;
    }
  }

  selectProperty(propertyId: string) {
    this.showPropertyDropdown = false;
    this.addResponseForm.patchValue({ property: propertyId });
  }

  getPropertyImage(propertyId: string): string {
    if (this.properties && this.properties.length > 0) {
      const property = this.properties.find(
        (property) => property.id === propertyId
      );
      if (property && property.images && property.images.length > 0) {
        return property.images[0];
      }
    }
    return 'assets/img/house-chimney-solid.svg';
  }

  getPropertyName(propertyId: string): string {
    if (this.properties && this.properties.length > 0) {
      const property = this.properties.find(
        (property) => property.id === propertyId
      );
      if (property && property.name) {
        return property.name;
      }
    }
    return '';
  }

  submitResponseForm() {
    if (this.addResponseForm.valid) {
      this.dataProvider.pageSetting.blur = true;
      this.databaseService
        .addResponse(this.addResponseForm.value)
        .then(() => {
          UIkit.modal(document.getElementById('add-response-modal')).hide();
          this.dataProvider.pageSetting.blur = false;
          this.alertify.presentToast('Response added successfully', 'info');
          this.addResponseForm.reset();
        })
        .catch((error) => {
          UIkit.modal(document.getElementById('add-response-modal')).hide();
          this.dataProvider.pageSetting.blur = false;
          this.alertify.presentToast('Error Occurred: ' + error, 'error');
          this.addResponseForm.reset();
        });
    } else {
      this.alertify.presentToast(
        'Please select both - the customer and the property',
        'error'
      );
    }
  }

  deleteResponse(response: any) {}
}
