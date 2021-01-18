import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAssignmentListComponent } from './work-assignment-list.component';

describe('WorkAssignmentListComponent', () => {
  let component: WorkAssignmentListComponent;
  let fixture: ComponentFixture<WorkAssignmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkAssignmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAssignmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
