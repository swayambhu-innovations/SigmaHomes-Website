import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
declare const UIkit:any;
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customers:any[]=[];
  constructor(private databaseService:DatabaseService,private alertify:AlertsAndNotificationsService,private dataProvider:DataProvider) { }
  newMode:boolean = true;
  currentEditId:string = '';
  currentViewCustomer:any;
  addCustomerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
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
  editCustomer(customer:any){
    this.addCustomerForm.patchValue(customer);
    this.newMode = false;
    this.currentEditId = customer.id;
    document.getElementById('add-customer-modal')?.addEventListener('hidden',()=>{
      this.newMode = true;
      this.currentEditId = '';
      this.addCustomerForm.reset();
    })
    UIkit.modal(document.getElementById('add-customer-modal')).show()
  }
  deleteCustomer(customer:any){
    console.log(customer);
    if (customer.id && confirm('Are you sure you want to delete this customer?')) {
      this.dataProvider.pageSetting.blur = true;
      this.databaseService.deleteCustomer(customer.id).then(()=>{
        this.dataProvider.pageSetting.blur = false;
        this.alertify.presentToast('Customer Deleted Successfully');
      }).catch((error)=>{
        this.dataProvider.pageSetting.blur = false;
        this.alertify.presentToast(error.message,'error',5000);
      })
    }
  }
  viewCustomer(customer:any){
    this.currentViewCustomer = customer;
    console.log(this.currentViewCustomer);
    UIkit.modal(document.getElementById('see-customer-modal')).show()
  }
  submitAddCustomerForm() {
    console.log(this.addCustomerForm.value);
    if (this.newMode){
      if (this.addCustomerForm.valid) {
        this.dataProvider.pageSetting.blur = true;
        console.log(this.addCustomerForm.value);
        this.databaseService.addCustomer(this.addCustomerForm.value).then(()=>{
          UIkit.modal(document.getElementById('add-customer-modal')).hide()
          this.addCustomerForm.reset();
          this.dataProvider.pageSetting.blur = false;
          this.alertify.presentToast('Customer Added Successfully');
        }).catch((error)=>{
          this.dataProvider.pageSetting.blur = false;
          this.alertify.presentToast(error.message,'error',5000);
        })
      }
    } else if(!this.newMode) {
      if (this.addCustomerForm.valid && this.currentEditId ) {
        console.log(this.addCustomerForm.value);
        this.dataProvider.pageSetting.blur = true;
        this.databaseService.updateCustomer(this.currentEditId,this.addCustomerForm.value).then(()=>{
          this.newMode = true;
          UIkit.modal(document.getElementById('add-customer-modal')).hide()
          this.addCustomerForm.reset();
          this.dataProvider.pageSetting.blur = false;
          this.alertify.presentToast('Customer Updated Successfully');
        }).catch((error)=>{
          this.dataProvider.pageSetting.blur = false;
          this.alertify.presentToast(error.message,'error',5000);
        })
      }
    }
  }

  ngOnInit(): void {
    this.databaseService.getCustomers().subscribe((data)=>{
      this.customers = []
      data.forEach((user:any)=>{
        let data = user.data();
        data.id = user.id;
        this.customers.push(data);
      })
    })
  }

}
