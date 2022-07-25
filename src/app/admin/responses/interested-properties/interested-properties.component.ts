import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-interested-properties',
  templateUrl: './interested-properties.component.html',
  styleUrls: ['./interested-properties.component.scss'],
})
export class InterestedPropertiesComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { properties: any[] }) {}

  ngOnInit(): void {}
}
