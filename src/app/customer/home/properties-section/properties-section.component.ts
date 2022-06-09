import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-properties-section',
  templateUrl: './properties-section.component.html',
  styleUrls: ['./properties-section.component.scss'],
})
export class PropertiesSectionComponent implements OnInit {
  properties: any[] = [];

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.databaseService.getNProjects(3).then((docs: any) => {
      this.properties = [];
      docs.forEach((doc: any) => {
        const property = { id: doc.id, ...doc.data() };
        this.properties.push(property);
      });
    });
  }
}
