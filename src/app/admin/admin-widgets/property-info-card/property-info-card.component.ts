import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-property-info-card',
  templateUrl: './property-info-card.component.html',
  styleUrls: ['./property-info-card.component.scss'],
})
export class PropertyInfoCardComponent implements OnInit {
  @Input() propertyImgSrc: string = '';
  @Input() propertyName: string = '';
  @Input() customerName: string = '';
  @Input() customerImgSrc: string = '';
  @Input() time: string = '';
  @Input() date: string = '';
  @Input() status: string = '';
  @Input() selectable: boolean = false;
  selected: boolean = false;

  @Output() cardClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  onClick() {
    this.cardClick.emit();
    if (this.selectable) {
      this.selected = !this.selected;
    }
  }

  ngOnInit(): void {}
}
