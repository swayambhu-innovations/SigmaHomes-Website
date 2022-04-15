import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesSectionComponent } from './properties-section.component';

describe('PropertiesSectionComponent', () => {
  let component: PropertiesSectionComponent;
  let fixture: ComponentFixture<PropertiesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
