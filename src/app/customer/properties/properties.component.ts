import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss'],
})
export class PropertiesComponent implements OnInit {
  properties: any[] = [];

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.databaseService.getAllProjects().subscribe((docs: any) => {
      this.properties = [];
      docs.forEach((doc: any) => {
        const property = { id: doc.id, ...doc.data() };
        this.properties.push(property);
      });
    });
  }
}
