import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignResponseComponent } from './assign-response.component';

describe('AssignResponseComponent', () => {
  let component: AssignResponseComponent;
  let fixture: ComponentFixture<AssignResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
