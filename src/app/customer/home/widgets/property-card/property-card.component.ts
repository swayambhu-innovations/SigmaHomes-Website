import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent implements OnInit {
  @Input() imageSrc: string = '';
  @Input() heading: string = '';
  @Input() price: string = '';
  @Input() address: string = '';
  @Input() area: string = '';
  @Input() rating: number = 0;
  liked: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
