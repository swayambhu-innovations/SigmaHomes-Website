import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBroadcastComponent } from './new-broadcast.component';

describe('NewBroadcastComponent', () => {
  let component: NewBroadcastComponent;
  let fixture: ComponentFixture<NewBroadcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBroadcastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBroadcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
