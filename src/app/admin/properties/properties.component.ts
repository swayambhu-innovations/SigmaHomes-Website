import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  filteredTypes: any[] = [];
openModal:any;
  projectForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required]),
    photos: new FormControl([]),
    builderName: new FormControl(''),
    plotArea: new FormControl(0),
    budget: new FormControl(0),
    facilitiesNearby: new FormControl(''),
    distanceFromImportantLocations: new FormControl(''),
    reraStatus: new FormControl(''),
  });

  typeForm: FormGroup = new FormGroup({
    project: new FormControl(null, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    photos: new FormControl([]),
    area: new FormControl(0),
    companySalesValue: new FormControl(0),
    companySalesRate: new FormControl(0),
    companyAcceptedValue: new FormControl(0),
    companyAcceptedRate: new FormControl(0),
  });

  unitForm: FormGroup = new FormGroup({
    project: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required]),
    name: new FormControl('', [Validators.required])
  });

  constructor(
    private dataProvider: DataProvider,
    private databaseService: DatabaseService,
    private alertService: AlertsAndNotificationsService,
    private csvService: CSVService,
    private activateRoute: ActivatedRoute
  ) 
  {
    this.activateRoute.queryParams.subscribe((data: any) => {
      console.log(data);
     
      if (data.openModal === 'true') {
        this.openModal = data.openModal;
        UIkit.modal(document.getElementById('project-modal')).show();
      }
      else{
        this.openModal = 'false';
      }
    });
  }


  ngOnInit() {
    if(this.openModal === 'true'){
      UIkit.modal(document.getElementById('project-modal')).show();
     }
  
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

    // // import projects
    // const importProjects = document.getElementById('import-projects');
    // if (importProjects) {
    //   importProjects.addEventListener(
    //     'click',
    //     () => {
    //       const input = document.createElement('input');
    //       input.type = 'file';
    //       input.accept = '.csv';
    //       input.click();
    //       input.onchange = () => {
    //         this.dataProvider.pageSetting.blur = true;
    //         if (input.files && input.files[0]) {
    //           this.csvService.load(input.files[0]);
    //           setTimeout(async () => {
    //             const projects = this.csvService.import();
    //             for (const project of projects) {
    //               project.images = project.images.split('|');
    //               Object.keys(this.projectForm).forEach((key) => {});
    //               await this.databaseService.addProject(project);
    //             }
    //             input.value = '';
    //             this.dataProvider.pageSetting.blur = false;
    //             this.alertService.presentToast(
    //               'Projects added successfully',
    //               'info'
    //             );
    //           }, 1000);
    //         }
    //       };
    //     },
    //     false
    //   );
    // }

    // // export projects
    // const exportProjects = document.getElementById('export-projects');
    // if (exportProjects) {
    //   exportProjects.addEventListener(
    //     'click',
    //     () => {
    //       if (this.projects.length > 0) {
    //         const keys = Object.keys(this.projects[0]);
    //         const csvData = [keys];
    //         this.projects.forEach((project) => {
    //           const values = [];
    //           for (const key of keys) {
    //             values.push(project[key]);
    //           }
    //           csvData.push(values);
    //         });
    //         this.csvService.export(csvData, 'projects');
    //       } else {
    //         this.alertService.presentToast('No projects to export', 'error');
    //       }
    //     },
    //     false
    //   );
    // }
  }

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

  validatePhotos(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      for (var i = 0; i < files.length; i++) {
        const file = files[i];
        var fileIsValid = false;
        if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
          this.alertService.presentToast(
            'Only png, jpeg and jpg images are allowed',
            'error'
          );
        } else if (file.size >= 1_000_000) {
          this.alertService.presentToast(
            "Each image's size must be less than 1 MB",
            'error'
          );
        } else {
          fileIsValid = true;
        }
        if (!fileIsValid) {
          target.value = '';
          return;
        }
      }
    }
  }

  async submitProjectForm() {
    if (this.projectForm.valid) {
      this.dataProvider.pageSetting.blur = true;

      // Upload photos
      const projectPhotosInput = document.getElementById(
        'project-photos-input'
      ) as HTMLInputElement;
      if (
        projectPhotosInput &&
        projectPhotosInput.files &&
        projectPhotosInput.files.length > 0
      ) {
        this.projectForm.value.photoURL = [];
        for (var i = 0; i < projectPhotosInput.files.length; i++) {
          await this.databaseService
            .upload(
              'projects/' + new Date().getTime(),
              projectPhotosInput.files[i]
            )
            .then((url) => {
              this.projectForm.value.photos.push(url);
            });
        }
      } else {
        this.projectForm.removeControl('photos');
      }

      const projectModal = UIkit.modal(
        document.getElementById('project-modal')
      );
      this.databaseService.addProject(this.projectForm.value).then(() => {
        projectModal.hide();
        this.projectForm.reset();
        (
          document.getElementById('project-photos-input') as HTMLInputElement
        ).value = '';
        this.ngOnInit();
        this.dataProvider.pageSetting.blur = false;
        this.alertService.presentToast('Project added successfully', 'info');
      });
    } else {
      this.alertService.presentToast(
        'Please fill all the required fields',
        'error'
      );
    }
  }

  async submitTypeForm() {
    if (this.typeForm.valid) {
      this.dataProvider.pageSetting.blur = true;

      // Upload photos
      const typePhotosInput = document.getElementById(
        'type-photos-input'
      ) as HTMLInputElement;
      if (
        typePhotosInput &&
        typePhotosInput.files &&
        typePhotosInput.files.length > 0
      ) {
        this.typeForm.value.photos = [];
        for (var i = 0; i < typePhotosInput.files.length; i++) {
          await this.databaseService
            .upload('types/' + new Date().getTime(), typePhotosInput.files[i])
            .then((url) => {
              this.typeForm.value.photos.push(url);
            });
        }
      } else {
        this.typeForm.removeControl('photos');
      }

      const typeModal = UIkit.modal(document.getElementById('type-modal'));
      this.databaseService.addType(this.typeForm.value).then(() => {
        typeModal.hide();
        this.typeForm.reset();
        typePhotosInput.value = '';
        this.ngOnInit();
        this.dataProvider.pageSetting.blur = false;
        this.alertService.presentToast('Type added successfully', 'info');
      });
    } else {
      this.alertService.presentToast(
        'Please fill all the required fields',
        'error'
      );
    }
  }

  async submitUnitForm() {
    if (this.unitForm.valid) {
      this.dataProvider.pageSetting.blur = true;
      const unitModal = UIkit.modal(document.getElementById('unit-modal'));
      
      this.databaseService.addUnit(this.unitForm.value).then(() => {
        unitModal.hide();
        this.unitForm.reset();
        this.ngOnInit();
        this.dataProvider.pageSetting.blur = false;
        this.alertService.presentToast('Unit added successfully', 'info');
      });
    } else {
      this.alertService.presentToast(
        'Please fill all the required fields',
        'error'
      );
    }
  }
}
