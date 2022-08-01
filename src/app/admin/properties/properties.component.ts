import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import Fuse from 'fuse.js';
import { CSVService } from 'src/app/services/csv.service';
import { ActivatedRoute } from '@angular/router';
declare const UIkit: any;

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss'],
})
export class PropertiesComponent implements OnInit {
  projects: any[];
  filteredProjects: any[];
  types: any[];

  constructor(
    private dataProvider: DataProvider,
    private databaseService: DatabaseService,
    private alertService: AlertsAndNotificationsService,
    private csvService: CSVService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activateRoute.queryParams.subscribe((data: any) => {
      if (data.openModal === 'true') {
        UIkit.modal(document.getElementById('project-modal')).show();
      }
    });

    this.databaseService.getAllProjects().subscribe((data: any) => {
      this.projects = [];
      data.forEach((element: any) => {
        const project = { id: element.id, ...element.data() };
        this.projects.push(project);
      });
      this.projects.sort((a, b) => a.name.localeCompare(b.name));
      this.filteredProjects = this.projects;
    });

    this.databaseService.getTypes().subscribe((data: any) => {
      this.types = [];
      data.forEach((element: any) => {
        const type = { id: element.id, ...element.data() };
        this.types.push(type);
      });
    });
  }

  ngAfterViewInit(): void {
    // Search projects
    const projectSearchInput = document.getElementById(
      'project-search-input'
    ) as HTMLInputElement;
    if (projectSearchInput) {
      projectSearchInput.oninput = () => {
        const query = projectSearchInput.value.trim();
        if (query.length > 0) {
          const options = { keys: ['name'] };
          const fuse = new Fuse(this.projects, options);
          const results = fuse.search(query);
          this.filteredProjects = [];
          results.forEach((result: any) => {
            this.filteredProjects.push(result.item);
          });
        } else {
          this.filteredProjects = this.projects;
        }
      };
    }

    // import projects
    const importProjects = document.getElementById('import-projects');
    if (importProjects) {
      importProjects.addEventListener(
        'click',
        () => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = '.csv';
          input.click();
          input.onchange = () => {
            this.dataProvider.pageSetting.blur = true;
            if (input.files && input.files[0]) {
              this.csvService.load(input.files[0]);
              setTimeout(async () => {
                const projects = this.csvService.import();
                for (const project of projects) {
                  if (project.photos) {
                    project.photos = project.photos.split('|');
                  }
                  await this.databaseService.addProject(project);
                }
                input.value = '';
                this.dataProvider.pageSetting.blur = false;
                this.alertService.presentToast(
                  'Projects added from CSV file',
                  'info'
                );
              }, 1000);
            }
          };
        },
        false
      );
    }

    // export projects
    const exportProjects = document.getElementById('export-projects');
    if (exportProjects) {
      exportProjects.addEventListener(
        'click',
        () => {
          if (this.projects.length > 0) {
            const keys = Object.keys(this.projects[0]);
            const csvData = [keys];
            this.projects.forEach((project) => {
              const values = [];
              for (const key of keys) {
                values.push(project[key]);
              }
              csvData.push(values);
            });
            this.csvService.export(csvData, 'projects');
          } else {
            this.alertService.presentToast('No projects to export', 'error');
          }
        },
        false
      );
    }
  }

  showDropdown() {
    const dropdown = document.getElementById('add-property-dropdown');
    if (dropdown) {
      UIkit.dropdown(dropdown).show();
    }
  }

  hideDropdown() {
    const dropdown = document.getElementById('add-property-dropdown');
    if (dropdown) {
      UIkit.dropdown(dropdown).hide(false);
    }
  }
}
