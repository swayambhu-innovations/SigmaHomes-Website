import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryBtnComponent } from './secondary-btn.component';

describe('SecondaryBtnComponent', () => {
  let component: SecondaryBtnComponent;
  let fixture: ComponentFixture<SecondaryBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondaryBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
