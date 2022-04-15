import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerSectionComponent } from './partner-section.component';

describe('PartnerSectionComponent', () => {
  let component: PartnerSectionComponent;
  let fixture: ComponentFixture<PartnerSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
