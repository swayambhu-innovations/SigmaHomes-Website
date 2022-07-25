import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectNegotiationPropertyComponent } from './select-negotiation-property.component';

describe('SelectNegotiationPropertyComponent', () => {
  let component: SelectNegotiationPropertyComponent;
  let fixture: ComponentFixture<SelectNegotiationPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectNegotiationPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectNegotiationPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
