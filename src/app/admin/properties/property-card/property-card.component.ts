import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss'],
})
export class PropertyCardComponent implements OnInit {
  @Input() images: string[] = [];
  @Input() heading: string = '';
  @Input() address: string = '';

  @Output() viewProperty: EventEmitter<any> = new EventEmitter<any>();
  @Output() editProperty: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteProperty: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
}
