import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomerModalComponent } from './view-customer-modal.component';

describe('ViewCustomerModalComponent', () => {
  let component: ViewCustomerModalComponent;
  let fixture: ComponentFixture<ViewCustomerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCustomerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCustomerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
