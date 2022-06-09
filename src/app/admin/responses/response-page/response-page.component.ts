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
  activePhase: number = -1;
  notes: any[] = [];

  addNoteForm: FormGroup = new FormGroup({
    date: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private databaseService: DatabaseService
  ) {
    // loading the response data from the url
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.route.params.subscribe((params) => {
          const responseId = params['responseId'];
          this.databaseService
            .getResponse(responseId)
            .then(async (response) => {
              const responseData = response.data();
              if (responseData) {
                this.response = {
                  id: response.id,
                  customer: (
                    await this.databaseService.getCustomer(
                      responseData['customer']
                    )
                  ).data(),
                  project: (
                    await this.databaseService.getProject(
                      responseData['project']
                    )
                  ).data(),
                  phase: responseData['phase'],
                };

                // now that the response data is loaded, get the response notes
                this.databaseService
                  .getNotes(this.response.id)
                  .then((data: any) => {
                    const noteDocs = data.docs[0].data();
                    console.log(noteDocs);
                    for (var i = 0; i < 5; i++) {
                      this.notes.push([]);
                    }
                    noteDocs.forEach((noteDoc: any) => {
                      const note = noteDoc.data();
                      this.notes[note.phase].push(note);
                      console.log(this.notes);
                    });

                    this.activePhase = this.response.phase;
                    console.log(this.notes);
                  });
              } else {
                this.router.navigate(['..'], { relativeTo: this.route });
              }
            });
        });
      }
    });
  }

  ngOnInit(): void {}

  completePhase(): void {
    this.response.phase++;
    this.databaseService.updateResponsePhase(
      this.response.id,
      this.response.phase
    );
  }

  discardPhase(): void {
    this.response.phase--;
    this.databaseService.updateResponsePhase(
      this.response.id,
      this.response.phase
    );
  }

  addNote(): void {}
}
