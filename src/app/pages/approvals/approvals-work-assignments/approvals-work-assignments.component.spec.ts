import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalsWorkAssignmentsComponent } from './approvals-work-assignments.component';

describe('ApprovalsWorkAssignmentsComponent', () => {
  let component: ApprovalsWorkAssignmentsComponent;
  let fixture: ComponentFixture<ApprovalsWorkAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalsWorkAssignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalsWorkAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
