import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitLogComponent } from './visit-log.component';

describe('VisitLogComponent', () => {
  let component: VisitLogComponent;
  let fixture: ComponentFixture<VisitLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
