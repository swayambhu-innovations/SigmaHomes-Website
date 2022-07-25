import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVoiceNoteFormComponent } from './add-voice-note-form.component';

describe('AddVoiceNoteFormComponent', () => {
  let component: AddVoiceNoteFormComponent;
  let fixture: ComponentFixture<AddVoiceNoteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVoiceNoteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVoiceNoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
