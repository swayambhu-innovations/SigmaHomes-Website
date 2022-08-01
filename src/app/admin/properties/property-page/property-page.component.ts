import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-property-page',
  templateUrl: './property-page.component.html',
  styleUrls: ['./property-page.component.scss'],
})
export class PropertyPageComponent implements OnInit {
  project: any;
  typeToEdit: any = null;
  typeIdOfUnit: string;
  unitToEdit: any = null;

  constructor(
    private router: Router,
    private databaseService: DatabaseService,
    private alertService: AlertsAndNotificationsService
  ) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        const url = this.router.url;
        const urlArr = url.split('/');
        const projectId = urlArr[urlArr.length - 1];

        if (urlArr.length >= 2 && urlArr[urlArr.length - 2] == 'properties') {
          this.getProject(projectId);
        }
      }
    });
  }

  ngOnInit() {}

  async getProject(projectId: string) {
    const projectData = (
      await this.databaseService.getProject(projectId)
    ).data();
    if (projectData) {
      this.project = projectData;
      this.project.id = projectId;
    } else {
      this.router.navigate(['/admin/properties']);
      return;
    }

    // Get project's types
    const typeDocs = await this.databaseService.getTypesOfProject(projectId);
    this.project.types = [];
    typeDocs.forEach(async (typeDoc) => {
      const type = typeDoc.data();
      type['id'] = typeDoc.id;

      // Get types' units
      type['units'] = [];
      const unitsDocs = await this.databaseService.getUnitsOfType(typeDoc.id);
      unitsDocs.forEach((unitDoc) => {
        const unit = unitDoc.data();
        unit['id'] = unitDoc.id;
        type['units'].push(unit);
      });
      type['units'].sort((a: any, b: any) => a.name.localeCompare(b.name));

      this.project.types.push(type);
    });
    this.project.types.sort((a: any, b: any) => a.name.localeCompare(b.name));
  }

  delete() {
    if (confirm('Are you sure you want to delete this project?')) {
      this.databaseService.deleteProject(this.project.id);
      this.router.navigate(['/admin/properties']);
      this.alertService.presentToast('Project deleted successfully', 'info');
    }
  }

  deleteType(typeId: string) {
    if (confirm('Are you sure you want to delete this type?')) {
      this.databaseService.deleteType(typeId).then(() => {
        location.reload();
        this.alertService.presentToast('Type deleted successfully', 'info');
      });
    }
  }

  deleteUnit(unitId: string) {
    if (confirm('Are you sure you want to delete this unit?')) {
      this.databaseService.deleteUnit(unitId).then(() => {
        location.reload();
        this.alertService.presentToast('Unit deleted successfully', 'info');
      });
    }
  }
}
