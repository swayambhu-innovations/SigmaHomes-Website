import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-response-page',
  templateUrl: './response-page.component.html',
  styleUrls: ['./response-page.component.scss', '../../admin.util.scss'],
})
export class ResponsePageComponent implements OnInit {
  response: any;
  activePhaseTab: string = '';

  addNoteForm: FormGroup = new FormGroup({
    date: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private databaseService: DatabaseService
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.route.params.subscribe((params) => {
          const responseId = params['responseId'];
          this.databaseService.getResponse(responseId).then((response) => {
            this.response = response.data();
            if (!this.response) {
              this.router.navigate(['..'], { relativeTo: this.route });
            } else {
              this.activePhaseTab = this.response.phase;
            }
          });
        });
      }
    });
  }

  ngOnInit(): void {}

  stageChecker(stage: string): number {
    switch (stage) {
      case 'stageOne':
        return 1;
      case 'stageTwo':
        return 2;
      case 'stageThree':
        return 3;
      case 'stageFour':
        return 4;
      case 'stageFive':
        return 5;
    }
    return -1;
  }

  addNote(): void {}
}
