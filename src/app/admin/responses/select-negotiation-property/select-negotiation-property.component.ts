import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-negotiation-property',
  templateUrl: './select-negotiation-property.component.html',
  styleUrls: ['./select-negotiation-property.component.scss'],
})
export class SelectNegotiationPropertyComponent implements OnInit {
  negotiationForm: FormGroup = new FormGroup({
    propertyIndex: new FormControl(null, Validators.required),
  });

  @Output() propertySelected: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { properties: any }
  ) {}

  ngOnInit(): void {}

  submit() {
    if (this.negotiationForm.valid) {
      this.propertySelected.emit(this.negotiationForm.value);
      this.dialog.closeAll();
      this.negotiationForm.reset();
    }
  }
}
