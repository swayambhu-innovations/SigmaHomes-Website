import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-log',
  templateUrl: './task-log.component.html',
  styleUrls: ['./task-log.component.scss', './task-log-details.component.scss'],
})
export class TaskLogComponent implements OnInit {
  taskLogs: any[] = [
    {
      id: 1,
      propertyImgSrc: '../../../../assets/img/unsplash_4ojhpgKpS68.png',
      propertyName: '3 BHK, Sky Heights',
      address: 'Orange Building, Near Town Hall, Jaunpuri West',
      area: '885 sqft.',
      price: '30 Lakhs',
      customerName: 'Brahmananda',
      customerImgSrc: '../../../../assets/img/unsplash_EVzvJoBdRgk.png',
      phone: '8791721248',
      time: '3:30PM',
      date: 'Sunday, April 25 2022',
      status: 'Tomorrow',
      phase: 'stageTwo',
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
      customerName: 'Raghav Chopra',
      customerImgSrc: '../../../../assets/img/unsplash_EVzvJoBdRgk.png',
      phone: '8791721248',
      time: '3:30PM',
      date: 'Sunday, April 25 2022',
      status: 'Tomorrow',
      phase: 'stageThree',
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
      status: 'Tomorrow',
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
      status: 'Tomorrow',
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
      status: 'Tomorrow',
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
      status: 'Tomorrow',
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
  viewTaskLogDetails: boolean = false;

  addLogForm: FormGroup = new FormGroup({
    responseId: new FormControl('', [Validators.required]),
    property: new FormControl('', [Validators.required]),
  });

  addNoteForm: FormGroup = new FormGroup({
    date: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor() {}

  loadTaskLogDetails(index: number) {
    this.viewTaskLogDetails = true;
    this.curResponse = index;
    this.activePhaseTab = this.taskLogs[index].phase;
  }

  stageChecker(stage: string): number {
    switch (stage) {
      case 'stageOne':
        return 1;
      case 'stageTwo':
        return 2;
      case 'stageThree':
        return 3;
    }
    return -1;
  }

  responseClick(event: Event, id: any) {
    const responseInput = document.getElementById('response-input');
    if (responseInput) {
      responseInput.setAttribute('value', id);
    }
  }

  addLog() {}

  addNote() {}

  ngOnInit(): void {}
}
