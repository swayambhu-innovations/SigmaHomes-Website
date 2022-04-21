import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TertiaryBtnComponent } from './tertiary-btn.component';

describe('TertiaryBtnComponent', () => {
  let component: TertiaryBtnComponent;
  let fixture: ComponentFixture<TertiaryBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TertiaryBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TertiaryBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
