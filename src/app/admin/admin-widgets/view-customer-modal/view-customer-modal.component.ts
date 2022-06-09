import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-customer-modal',
  templateUrl: './view-customer-modal.component.html',
  styleUrls: ['./view-customer-modal.component.scss'],
})
export class ViewCustomerModalComponent implements OnInit {
  @Input() customer: any;

  constructor() {}

  ngOnInit(): void {}
}
