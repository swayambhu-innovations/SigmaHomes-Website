import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyInfoCardComponent } from './property-info-card.component';

describe('PropertyInfoCardComponent', () => {
  let component: PropertyInfoCardComponent;
  let fixture: ComponentFixture<PropertyInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyInfoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
