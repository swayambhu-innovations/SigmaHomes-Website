import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-taskcard',
  templateUrl: './taskcard.component.html',
  styleUrls: ['./taskcard.component.scss']
})
export class TaskcardComponent implements OnInit {
  @Input() propertyName: string;
  @Input() assignedAgentImage:string;
  @Input() assignedAgentName:string;
  constructor() { }

  ngOnInit(): void {
  }

}
