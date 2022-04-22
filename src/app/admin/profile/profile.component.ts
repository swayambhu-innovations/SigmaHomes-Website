import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  editMode: boolean = false;
  
  goToEditMode() {
    this.editMode = true;
  }

  saveEdit() {
    this.editMode = false;
  }

  cancelEdit() {
    this.editMode = false;
  }


  constructor() {}

  ngOnInit(): void {}
}
