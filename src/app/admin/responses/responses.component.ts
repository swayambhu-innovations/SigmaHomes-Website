import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.scss', 'responses.modal.scss'],
})
export class ResponsesComponent implements OnInit {
  responses: any[];
  filteredResponses: any[];
  viewAs: any = 'cards';
  phases: any = {
    stageOne: 'Query',
    stageTwo: 'Visitation',
    stageThree: 'Negotiation',
    stageFour: 'Legalization',
    stageFive: 'Closure',
  };
  responsesSelected: string[] = [];

  addResponseForm: FormGroup = new FormGroup({
    lead: new FormControl('', [Validators.required]),
    phase: new FormControl('', [Validators.required]),
    property: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private databaseService: DatabaseService
  ) {}

  toggleSelection(responseId: string) {
    if (this.responsesSelected.includes(responseId)) {
      this.responsesSelected = this.responsesSelected.filter(
        (id) => id !== responseId
      );
    }
    else {
      this.responsesSelected.push(responseId);
    }
  }

  goToResponsePage(responseId: any) {
    this.router.navigate([responseId], { relativeTo: this.route });
    // this.activePhaseTab = this.responses[index].phase;
  }

  editResponse(response: any) {}

  deleteResponse(response: any) {}

  selectPhase(event: Event, phase: string) {
    const target = event.target;
  }

  addResponse() {
    if (this.addResponseForm.valid) {
      //   this.dataProvider.pageSetting.blur = true;
      //   this.databaseService
      //     .addLead(this.leadForm.value)
      //     .then(() => {
      //       this.alertify.presentToast('Lead Added Successfully', 'info');
      //       this.leadForm.reset();
      //       UIkit.modal(document.getElementById('add-lead-modal')).hide();
      //       this.dataProvider.pageSetting.blur = false;
      //     })
      //     .catch((error) => {
      //       this.dataProvider.pageSetting.blur = false;
      //       this.alertify.presentToast('Error Occurred: ' + error, 'error');
      //     });
      // } else {
      //   this.alertify.presentToast('Please Fill All The Fields', 'error');
      // }
    }
  }

  ngOnInit(): void {
    this.databaseService.getResponses().subscribe((data: any) => {
      this.responses = [];
      this.filteredResponses = this.responses;
      data.forEach((element: any) => {
        const response = { id: element.id, ...element.data() };
        this.responses.push(response);
      });
    });
  }

  ngAfterViewInit(): void {
    // Set up response search
    const responseSearchInput = document.getElementById(
      'response-search-input'
    ) as HTMLInputElement;

    if (responseSearchInput) {
      responseSearchInput.addEventListener(
        'input',
        () => {
          const query = responseSearchInput.value.trim().toLowerCase();
          this.filteredResponses = this.responses.filter((response) => {
            return response.customerName.toLowerCase().indexOf(query) !== -1;
          });
          this.filteredResponses.sort((response1, response2) => {
            const index1 = response1.customerName.toLowerCase().indexOf(query);
            const index2 = response2.customerName.toLowerCase().indexOf(query);
            return index1 - index2;
          });
        },
        false
      );
    }

    // Set up "view as"
    const viewResponsesAs = document.getElementById('view-responses-as');
    if (viewResponsesAs) {
      viewResponsesAs.addEventListener(
        'click',
        (event: Event) => {
          var target = event.target as HTMLElement;
          if (target.classList.contains('view-as-btn')) {
            this.viewAs = target.getAttribute('data-view-as');
          } else if (target.parentElement?.classList.contains('view-as-btn')) {
            this.viewAs = target.parentElement.getAttribute('data-view-as');
          }
        },
        false
      );
    }
  }
}
