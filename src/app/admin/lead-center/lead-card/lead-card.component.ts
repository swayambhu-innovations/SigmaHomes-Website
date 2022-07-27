import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  expanded: boolean = true;
  showDropdown: boolean = false;

  visibleInputs: any = [];

  constructor(
    private databaseService: DatabaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    document.addEventListener('mouseup', (event: Event) => {
      const dropdownContainer = document.getElementById('dropdown-container');
      if (dropdownContainer && event.target) {
        if (!dropdownContainer.contains(event.target as Node)) {
          this.showDropdown = false;
        }
      }
    });
  }

  addField(input: string, value: string): void {
    this.lead[input] = value;
    this.databaseService.updateLead(this.lead.id, this.lead);
  }

  createResponse(leadId: string) {
    this.router.navigate(['/admin/responses'], {
      queryParams: {
        openModal: true,
        customerOrLead: 'lead',
        id: leadId,
      },
    });
  }
}
