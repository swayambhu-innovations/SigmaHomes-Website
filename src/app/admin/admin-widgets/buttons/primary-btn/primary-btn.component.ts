import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-primary-btn',
  templateUrl: './primary-btn.component.html',
  styleUrls: ['../buttons.scss', './primary-btn.component.scss'],
})
export class PrimaryBtnComponent implements OnInit {
  @Input() innerHtml: string = '';
  @Output() btnClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
