import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personality-questions',
  templateUrl: './personality-questions.component.html',
  styleUrls: ['./personality-questions.component.scss']
})
export class PersonalityQuestionsComponent implements OnInit {
  questions = [
    {
      "question":"I have a kind word for everyone."
    },
    {
      "question":"I am always prepared."
    },
    {
      "question":"I feel comfortable around people. "
    },
    {
      "question":"I often feel blue. "
    },
    {
      "question":"I believe in the importance of art. "
    },
    {
      "question":"I feel I am better than other people. "
    },
    {
      "question":"I avoid taking on a lot of responsibility. "
    },
    {
      "question":"I make friends easily. "
    },
    {
      "question":"There are many things that I do not like about myself. "
    },
    {
      "question":"I am interested in the meaning of things. "
    },
    {
      "question":"I treat everyone with kindness and sympathy. "
    },
    {
      "question":"I get chores done right away. "
    },
    {
      "question":"I am skilled in handling social situations. "
    },
    {
      "question":"I am often troubled by negative thoughts. "
    },
    {
      "question":"I enjoy going to art museums. "
    },
    {
      "question":"I accept people the way they are. "
    },
    {
      "question":"It's important to me that people are on time. "
    },
    {
      "question":"I am the life of the party."
    },
    {
      "question":"My moods change easily. "
    },
    {
      "question":"I have a vivid imagination. "
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
