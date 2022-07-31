import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { CSVService } from 'src/app/services/csv.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import Fuse from 'fuse.js';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { BulkService } from 'src/app/services/bulk.service';
declare const UIkit: any;

@Component({
  selector: 'app-lead-center',
  templateUrl: './lead-center.component.html',
  styleUrls: ['./lead-center.component.scss'],
})
export class LeadCenterComponent implements OnInit {
  leads: any[] = [];
  filteredLeads: any[] = [];
  editMode: boolean = false;
  editLeadsValue: any;
  currentLeadId: string = '';
  openModal: any;
  constructor(
    private databaseService: DatabaseService,
    private alertify: AlertsAndNotificationsService,
    private dataProvider: DataProvider,
    private csvService: CSVService,
    private router: Router,
    private route: ActivatedRoute,
    private dataTransferService: DataTransferService,
    private bulkDataHandler: BulkService,
    private activateRoute: ActivatedRoute
  ) {
    this.activateRoute.queryParams.subscribe((data: any) => {
      if (data.openModal === 'true') {
        this.openModal = data.openModal;
        UIkit.modal(document.getElementById('lead-modal')).show();
      } else {
        this.openModal = 'false';
      }
    });
  }

  leadForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required]),
    aadharNo: new FormControl('', [Validators.required]),
    panNo: new FormControl('', [Validators.required]),
    customerDob: new FormControl('', [Validators.required]),
    customerAnniversary: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    if (this.openModal === 'true') {
      UIkit.modal(document.getElementById('lead-modal')).show();
    }

    this.databaseService.getLeadsPromise().then((data) => {
      this.leads = [];
      data.forEach((element: any) => {
        let data = element.data();
        data.id = element.id;
        this.leads.push(data);
      });
      this.filteredLeads = this.leads;
    });
  }

  ngAfterViewInit(): void {
    // search leads
    const leadSearchInput = document.getElementById(
      'lead-search-input'
    ) as HTMLInputElement;
    if (leadSearchInput) {
      leadSearchInput.oninput = () => {
        const query = leadSearchInput.value.trim();
        if (query.length > 0) {
          const options = { keys: ['name', 'phone', 'email'] };
          const fuse = new Fuse(this.leads, options);
          const results = fuse.search(query);
          this.filteredLeads = [];
          results.forEach((result: any) => {
            this.filteredLeads.push(result.item);
          });
        } else {
          this.filteredLeads = this.leads;
        }
      };
    }

    // import leads
    const importLeads = document.getElementById('import-leads');
    if (importLeads) {
      importLeads.addEventListener(
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
                const leads = this.csvService.import();
                for (const lead of leads) {
                  const id = (await this.databaseService.addLead(lead)).id;
                  lead.id = id;
                  this.leads.push(lead);
                  this.leads.sort((a, b) => a.name.localeCompare(b.name));
                }
                input.value = '';
                this.dataProvider.pageSetting.blur = false;
                this.alertify.presentToast('Leads added from CSV file', 'info');
              }, 1000);
            }
          };
        },
        false
      );
    }

    // export leads
    const exportLeads = document.getElementById('export-leads');
    if (exportLeads) {
      exportLeads.addEventListener(
        'click',
        () => {
          if (this.leads.length > 0) {
            const keys = Object.keys(this.leads[0]);
            const csvData = [keys];
            this.leads.forEach((lead) => {
              const values = [];
              for (const key of keys) {
                values.push(lead[key]);
              }
              csvData.push(values);
            });
            this.csvService.export(csvData, 'leads');
          } else {
            this.alertify.presentToast('No leads to export', 'error');
          }
        },
        false
      );
    }
  }

  makeCustomer(lead: any) {
    this.dataTransferService.setLead(lead);
    this.router.navigate(['../customers'], { relativeTo: this.route });
  }

  edit(lead: any) {
    this.editMode = true;
    this.currentLeadId = lead.id;
    this.leadForm.patchValue(lead);

    // Patching dates (gets tricky)
    const dobDate = new Date(lead.customerDob);
    const dobFormat =
      dobDate.getFullYear() +
      '-' +
      String(dobDate.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(dobDate.getDate()).padStart(2, '0');
    this.leadForm.patchValue({ customerDob: dobFormat });

    const anniversaryDate = new Date(lead.customerAnniversary);
    const anniversaryFormat =
      anniversaryDate.getFullYear() +
      '-' +
      String(anniversaryDate.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(anniversaryDate.getDate()).padStart(2, '0');
    this.leadForm.patchValue({ customerAnniversary: anniversaryFormat });

    document.getElementById('lead-modal')?.addEventListener('hidden', () => {
      this.editMode = false;
      this.currentLeadId = '';
      this.editLeadsValue = undefined;
      this.leadForm.reset();
    });
    UIkit.modal(document.getElementById('lead-modal')).show();
  }

  delete(lead: any) {
    if (lead.id && confirm('Are you sure you want to delete this lead?')) {
      this.dataProvider.pageSetting.blur = true;
      this.databaseService
        .deleteLead(lead.id)
        .then(() => {
          this.dataProvider.pageSetting.blur = false;
          this.ngOnInit();
          this.alertify.presentToast('Lead Deleted Successfully', 'info');
        })
        .catch((error) => {
          this.alertify.presentToast('Error Occurred: ' + error, 'error');
        });
    }
  }

  editLead(leadId: string) {
    if (this.leadForm.valid) {
      this.dataProvider.pageSetting.blur = true;
      this.databaseService
        .updateLead(leadId, this.leadForm.value)
        .then(() => {
          this.alertify.presentToast('Lead Updated Successfully', 'info');
          this.ngOnInit();
          this.leadForm.reset();
          this.editMode = false;
          UIkit.modal(document.getElementById('lead-modal')).hide();
          this.dataProvider.pageSetting.blur = false;
        })
        .catch((error) => {
          this.dataProvider.pageSetting.blur = false;
          this.alertify.presentToast('Error Occurred: ' + error, 'error');
        });
    } else {
      this.alertify.presentToast('Please Fill All The Fields', 'error');
    }
  }

  addLead() {
    if (this.leadForm.valid) {
      this.dataProvider.pageSetting.blur = true;
      this.databaseService
        .addLead(this.leadForm.value)
        .then(() => {
          this.alertify.presentToast('Lead Added Successfully', 'info');
          this.ngOnInit();
          this.leadForm.reset();
          UIkit.modal(document.getElementById('lead-modal')).hide();
          this.dataProvider.pageSetting.blur = false;
        })
        .catch((error) => {
          this.dataProvider.pageSetting.blur = false;
          this.alertify.presentToast('Error Occurred: ' + error, 'error');
        });
    } else {
      this.alertify.presentToast('Please Fill All The Fields', 'error');
    }
  }
}
