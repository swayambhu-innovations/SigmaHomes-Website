import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
declare const UIkit: any;

@Component({
  selector: 'app-unit-modal',
  templateUrl: './unit-modal.component.html',
  styleUrls: ['../property-modals.scss'],
})
export class UnitModalComponent implements OnInit {
  @Input() projects: any[];
  @Input() types: any[];
  @Input() projectId: string;
  @Input() typeId: string;
  @Input() unitToEdit: any;
  filteredTypes: any[];

  unitForm: FormGroup = new FormGroup({
    project: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required]),
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    private dataProvider: DataProvider,
    private databaseService: DatabaseService,
    private alertService: AlertsAndNotificationsService
  ) {}

  ngOnInit(): void {}

  projectHasTypes(projectId: string) {
    if (this.types) {
      for (const type of this.types) {
        if (type.project === projectId) {
          return true;
        }
      }
    }
    return false;
  }

  filterTypes(event: Event) {
    const selectedProject = (event.target as HTMLSelectElement).value.split(
      ' '
    )[1];
    this.filteredTypes = this.types.filter((type) => {
      return type.project === selectedProject;
    });
  }

  async submitUnitForm() {
    if (this.unitForm.valid) {
      this.dataProvider.pageSetting.blur = true;

      if (this.unitToEdit) {
        await this.databaseService.editUnit(
          this.unitToEdit.id,
          this.unitForm.value
        );
      } else {
        await this.databaseService.addUnit(this.unitForm.value);
      }

      const unitModal = UIkit.modal(document.getElementById('unit-modal'));
      unitModal.hide();
      this.unitForm.reset();
      location.reload();
      this.dataProvider.pageSetting.blur = false;

      if (this.unitToEdit) {
        this.alertService.presentToast('Unit edited successfully', 'info');
      } else {
        this.alertService.presentToast('Unit added successfully', 'info');
      }
    } else {
      this.alertService.presentToast(
        'Please fill all the required fields',
        'error'
      );
    }
  }
}
