import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-property-info-card',
  templateUrl: './property-info-card.component.html',
  styleUrls: ['./property-info-card.component.scss'],
})
export class PropertyInfoCardComponent implements OnInit {
  @Input() id: string = '';
  @Input() property: any;
  @Input() customer: any;
  @Input() status: string = '';
  @Input() selectable: boolean = false;
  @Input() selected: boolean = false;
  @Output() view: EventEmitter<any> = new EventEmitter<any>();
  @Output() cardSelect: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  selectResponse(): void {
    this.selected = !this.selected;
    this.cardSelect.emit(this.id);
  }
}
