import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalityQuestionsRoutingModule } from './personality-questions-routing.module';
import { PersonalityQuestionsComponent } from './personality-questions.component';


@NgModule({
  declarations: [
    PersonalityQuestionsComponent
  ],
  imports: [
    CommonModule,
    PersonalityQuestionsRoutingModule
  ]
})
export class PersonalityQuestionsModule { }
