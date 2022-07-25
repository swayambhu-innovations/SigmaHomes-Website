import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {
  exists: boolean = true;
  @Input() project: any = {};
  @Input() type: any = null;
  @Input() unit: any = null;

  constructor(
    private databaseService: DatabaseService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // If project ID is given in place of project object, get the object
    if (typeof this.project == 'string') {
      this.databaseService.getProject(this.project).then((projectDoc) => {
        if (projectDoc.exists()) {
          this.project = projectDoc.data();
        } else {
          this.exists = false;
        }
      });
    }

    // If type ID is given in place of type object, get the object
    if (typeof this.type == 'string') {
      this.databaseService.getType(this.type).then((typeDoc) => {
        if (typeDoc.exists()) {
          this.type = typeDoc.data();
        }
      });
    }

    // If unit ID is given in place of unit object, get the object
    if (typeof this.unit == 'string') {
      this.databaseService.getUnit(this.unit).then((unitDoc) => {
        if (unitDoc.exists()) {
          this.unit = unitDoc.data();
        }
      });
    }
  }
}
