import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tertiary-btn',
  templateUrl: './tertiary-btn.component.html',
  styleUrls: ['../buttons.scss', './tertiary-btn.component.scss'],
})
export class TertiaryBtnComponent implements OnInit {
  @Input() icon: string = '';
  @Input() text: string = '';
  @Input() disabled: boolean = false;
  @Input() target: string = '';
  @Output() btnClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
