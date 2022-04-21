import { Component, OnInit, Input } from '@angular/core';

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
