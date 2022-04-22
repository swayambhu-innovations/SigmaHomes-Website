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
  @Input() editMode: boolean = true;
  // @Output() photoChange = new EventEmitter<FileList>();

  changePhoto() {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.name = 'profile-photo';
    inputElement.multiple = false;
    inputElement.click();
    
    // inputElement.onchange = () => {
    //   if (inputElement.files && inputElement.files.length == 1) {
    //     this.photoChange.emit(inputElement.files);
    //   }
    // };
  }

  constructor() { }

  ngOnInit(): void {
  }

}
