import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-lead-card',
  templateUrl: './lead-card.component.html',
  styleUrls: ['./lead-card.component.scss'],
})
export class LeadCardComponent implements OnInit {
  @Input() lead: any;

  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onMakeCustomer: EventEmitter<any> = new EventEmitter();
  @Output() viewproperty: EventEmitter<any> = new EventEmitter();

  expanded: boolean = true;

  visibleInputs: any = [];

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {}

  addField(input: string, value: string): void {
    this.lead[input] = value;
    this.databaseService.updateLead(this.lead.id, this.lead);
  }
}
