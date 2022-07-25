import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-or-lead-details',
  templateUrl: './customer-or-lead-details.component.html',
  styleUrls: ['./customer-or-lead-details.component.scss'],
})
export class CustomerOrLeadDetailsComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { customerOrLead: any }) {}

  ngOnInit(): void {}
}
