import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
declare const UIkit: any;

@Component({
  selector: 'app-property-page',
  templateUrl: './property-page.component.html',
  styleUrls: ['./property-page.component.scss'],
})
export class PropertyPageComponent implements OnInit {
  project: any;
  ingredients: any;
  customers: any[];
  currentViewCustomer: any;

  constructor(
    private router: Router,
    private databaseService: DatabaseService
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
    } else {
      this.router.navigate(['/admin/properties']);
      return;
    }

    // Get project's types
    const typeDocs = await this.databaseService.getTypesOfProject(projectId);
    this.project.types = [];
    typeDocs.forEach(async (typeDoc) => {
      const type = typeDoc.data();

      // Get types' units
      type['units'] = [];
      const unitsDocs = await this.databaseService.getUnitsOfType(typeDoc.id);
      unitsDocs.forEach((unitsDoc) => {
        const unit = unitsDoc.data();
        type['units'].push(unit);
      });
      type['units'].sort((a: any, b: any) => a.name.localeCompare(b.name))

      this.project.types.push(type);
    });
    this.project.types.sort((a: any, b: any) => a.name.localeCompare(b.name))
  }
  viewInstrested(property: any) {
    this.currentViewCustomer = property;
    UIkit.modal(document.getElementById('interested-modal')).show();
  }
}
