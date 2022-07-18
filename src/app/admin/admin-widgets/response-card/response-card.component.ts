import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-response-card',
  templateUrl: './response-card.component.html',
  styleUrls: ['./response-card.component.scss'],
})
export class ResponseCardComponent implements OnInit {
  @Input() id: string = '';
  @Input() response: any;
  @Input() selectable: boolean = false;
  @Input() selected: boolean = false;
  @Input() readOnly: boolean = false;
  @Input() requestPending: boolean = false;
  @Output() view: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() cardSelect: EventEmitter<string> = new EventEmitter<string>();

  phases: string[] = [
    'Query',
    'Visitation',
    'Negotiation',
    'Legalization',
    'Closure',
  ];

  constructor() {}

  ngOnInit(): void {
  }

  selectResponse(): void {
    this.selected = !this.selected;
    this.cardSelect.emit(this.id);
  }
}
