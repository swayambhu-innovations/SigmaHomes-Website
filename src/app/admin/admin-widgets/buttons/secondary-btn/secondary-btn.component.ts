import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-secondary-btn',
  templateUrl: './secondary-btn.component.html',
  styleUrls: ['../buttons.scss', './secondary-btn.component.scss']
})
export class SecondaryBtnComponent implements OnInit {
  @Input() text: string = '';
  @Input() icon: string = '';
  @Input() type: string = '';
  @Input() disabled: boolean = false;
  @Input() target: string = '';
  @Output() btnClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
