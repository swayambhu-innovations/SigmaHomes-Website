import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrLeadDetailsComponent } from './customer-or-lead-details.component';

describe('CustomerOrLeadDetailsComponent', () => {
  let component: CustomerOrLeadDetailsComponent;
  let fixture: ComponentFixture<CustomerOrLeadDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOrLeadDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrLeadDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
