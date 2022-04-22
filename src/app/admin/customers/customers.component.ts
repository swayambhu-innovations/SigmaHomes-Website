import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  constructor() { }

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

  submitAddCustomerForm() {
    
  }

  ngOnInit(): void {
  }

}
