import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCenterComponent } from './lead-center.component';

describe('LeadCenterComponent', () => {
  let component: LeadCenterComponent;
  let fixture: ComponentFixture<LeadCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
