import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsePageComponent } from './response-page.component';

describe('ResponsePageComponent', () => {
  let component: ResponsePageComponent;
  let fixture: ComponentFixture<ResponsePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
