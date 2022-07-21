import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalityQuestionsComponent } from './personality-questions.component';

const routes: Routes = [{ path: '', component: PersonalityQuestionsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalityQuestionsRoutingModule { }
