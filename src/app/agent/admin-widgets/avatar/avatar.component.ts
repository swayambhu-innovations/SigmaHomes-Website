import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() imgSrc: string = '';
  @Input() altText: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
