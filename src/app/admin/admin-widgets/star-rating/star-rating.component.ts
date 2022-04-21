import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent implements OnInit {
  @Input() readonly: boolean = false;
  @Input() rating: number = 0;
  @Input() max: number = 5;
  @Output() selectedStars: EventEmitter<any> = new EventEmitter();
  filled: number = 0;

  constructor() {}
  
  genList() {
    return Array(this.max)
      .fill(0)
      .map((x, i) => i + 1);
  }
  
  selectedStarsTrigger() {
    this.selectedStars.emit(this.filled);
  }
  
  ngOnInit(): void {
    this.getRating();
  }
  
  getRating() {
    if (this.rating) {
      this.filled = this.rating;
    }
  }
}
