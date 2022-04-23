import { Component,EventEmitter , OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-lead-card',
  templateUrl: './lead-card.component.html',
  styleUrls: ['./lead-card.component.scss'],
})
export class LeadCardComponent implements OnInit {
  @Input() name: string = '';
  @Input() budget: string = '';
  @Input() interestedIn: string = '';
  @Input() preferredLocality: string = '';
  @Input() contactNumber: string = '';
  @Input() job: string = '';
  @Input() salary: string = '';
  @Input() otherPreferences: string = '';
  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  constructor() {}
  edit(){
    this.onEdit.emit();
  }
  delete(){
    this.onDelete.emit();
  }
  ngOnInit(): void {}
}
