import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalityQuestionsComponent } from './personality-questions.component';

describe('PersonalityQuestionsComponent', () => {
  let component: PersonalityQuestionsComponent;
  let fixture: ComponentFixture<PersonalityQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalityQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalityQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
