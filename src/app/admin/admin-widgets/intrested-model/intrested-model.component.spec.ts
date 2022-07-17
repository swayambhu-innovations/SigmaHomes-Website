import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrestedModelComponent } from './intrested-model.component';

describe('IntrestedModelComponent', () => {
  let component: IntrestedModelComponent;
  let fixture: ComponentFixture<IntrestedModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntrestedModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrestedModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
