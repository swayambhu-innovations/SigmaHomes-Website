import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAgentComponent } from './change-agent.component';

describe('ChangeAgentComponent', () => {
  let component: ChangeAgentComponent;
  let fixture: ComponentFixture<ChangeAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
