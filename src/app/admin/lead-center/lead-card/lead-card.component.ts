import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-lead-card',
  templateUrl: './lead-card.component.html',
  styleUrls: ['./lead-card.component.scss'],
})
export class LeadCardComponent implements OnInit {
  @Input() name: string = '';
  @Input() number: string = '';
  @Input() email: string = '';
  @Input() address: string = '';
  @Input() city: string = '';
  @Input() state: string = '';
  @Input() pinCode: string = '';
  @Input() aadharNo: string = '';
  @Input() panNo: string = '';
  @Input() customerDob: string = '';
  @Input() customerAnniversary: string = '';

  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onMakeCustomer: EventEmitter<any> = new EventEmitter();

  expanded: boolean = true;

  constructor() {}
  
  ngOnInit(): void {}
}
