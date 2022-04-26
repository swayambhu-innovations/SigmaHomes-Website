import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: [
    './responses.component.scss',
    './response-details.component.scss',
  ],
})
export class ResponsesComponent implements OnInit {
  responses: any[] = [
    {
      id: 1,
      propertyImgSrc: '../../../../assets/img/unsplash_4ojhpgKpS68.png',
      propertyName: '3 BHK, Sky Heights',
      address: 'Orange Building, Near Town Hall, Jaunpuri West',
      area: '885 sqft.',
      price: '30 Lakhs',
      customerName: 'Niraj Chopra',
      customerImgSrc: '../../../../assets/img/unsplash_EVzvJoBdRgk.png',
      phone: '8791721248',
      time: '3:30PM',
      date: 'Sunday, April 25 2022',
      badge: 'Tomorrow',
      phase: 'stageFour',
      phases: {
        stageOne: [
          {
            date: '25 April 2022',
            description:
              'Query ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
        stageTwo: [
          {
            date: '25 April 2022',
            description:
              'Two ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
        stageThree: [
          {
            date: '25 April 2022',
            description:
              'Three ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
        stageFour: [
          {
            date: '25 April 2022',
            description:
              'Legali ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
        stageFive: [
          {
            date: '25 April 2022',
            description:
              'F5 ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
      },
    },
    {
      id: 2,
      propertyImgSrc: '../../../../assets/img/unsplash_4ojhpgKpS68.png',
      propertyName: '3 BHK, Sky Heights',
      address: 'Orange Building, Near Town Hall, Jaunpuri West',
      area: '885 sqft.',
      price: '30 Lakhs',
      customerName: 'Niraj Chopra',
      customerImgSrc: '../../../../assets/img/unsplash_EVzvJoBdRgk.png',
      phone: '8791721248',
      time: '3:30PM',
      date: 'Sunday, April 25 2022',
      badge: 'Tomorrow',
      phase: 'stageFour',
      phases: {
        stageOne: [
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
        stageTwo: [
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
        stageThree: [
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
        stageFour: [
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
        stageFive: [
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
      },
    },
    {
      id: 3,
      propertyImgSrc: '../../../../assets/img/unsplash_4ojhpgKpS68.png',
      propertyName: '3 BHK, Sky Heights',
      address: 'Orange Building, Near Town Hall, Jaunpuri West',
      area: '885 sqft.',
      price: '30 Lakhs',
      customerName: 'Niraj Chopra',
      customerImgSrc: '../../../../assets/img/unsplash_EVzvJoBdRgk.png',
      phone: '8791721248',
      time: '3:30PM',
      date: 'Sunday, April 25 2022',
      badge: 'Tomorrow',
      phase: 'stageFour',
      phases: {
        stageOne: [
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
        stageTwo: [
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
        stageThree: [
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
        stageFour: [
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
        stageFive: [
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
      },
    },
    {
      id: 4,
      propertyImgSrc: '../../../../assets/img/unsplash_4ojhpgKpS68.png',
      propertyName: '3 BHK, Sky Heights',
      address: 'Orange Building, Near Town Hall, Jaunpuri West',
      area: '885 sqft.',
      price: '30 Lakhs',
      customerName: 'Niraj Chopra',
      customerImgSrc: '../../../../assets/img/unsplash_EVzvJoBdRgk.png',
      phone: '8791721248',
      time: '3:30PM',
      date: 'Sunday, April 25 2022',
      badge: 'Tomorrow',
      phase: 'stageFour',
      phases: {
        stageOne: [
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
        stageTwo: [
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
        stageThree: [
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
        stageFour: [
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
        stageFive: [
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
      },
    },
    {
      id: 5,
      propertyImgSrc: '../../../../assets/img/unsplash_4ojhpgKpS68.png',
      propertyName: '3 BHK, Sky Heights',
      address: 'Orange Building, Near Town Hall, Jaunpuri West',
      area: '885 sqft.',
      price: '30 Lakhs',
      customerName: 'Niraj Chopra',
      customerImgSrc: '../../../../assets/img/unsplash_EVzvJoBdRgk.png',
      phone: '8791721248',
      time: '3:30PM',
      date: 'Sunday, April 25 2022',
      badge: 'Tomorrow',
      phase: 'stageFour',
      phases: {
        stageOne: [
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
        stageTwo: [
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
        stageThree: [
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
        stageFour: [
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
        stageFive: [
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
      },
    },
    {
      id: 6,
      propertyImgSrc: '../../../../assets/img/unsplash_4ojhpgKpS68.png',
      propertyName: '3 BHK, Sky Heights',
      address: 'Orange Building, Near Town Hall, Jaunpuri West',
      area: '885 sqft.',
      price: '30 Lakhs',
      customerName: 'Niraj Chopra',
      customerImgSrc: '../../../../assets/img/unsplash_EVzvJoBdRgk.png',
      phone: '8791721248',
      time: '3:30PM',
      date: 'Sunday, April 25 2022',
      badge: 'Tomorrow',
      phase: 'stageFour',
      phases: {
        stageOne: [
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
        stageTwo: [
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
        stageThree: [
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
        stageFour: [
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
        stageFive: [
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
          {
            date: '25 April 2022',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, eius.',
          },
        ],
      },
    },
  ];
  curResponse: number = -1;
  activePhaseTab: string = '';
  viewResponseDetails: boolean = false;

  addResponseForm: FormGroup = new FormGroup({
    lead: new FormControl('', [Validators.required]),
    property: new FormControl('', [Validators.required]),
  });

  constructor() {}

  loadResponseDetails(index: number) {
    this.viewResponseDetails = true;
    this.curResponse = index;
    this.activePhaseTab = this.responses[index].phase;
  }

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

  ngOnInit(): void {}
}
