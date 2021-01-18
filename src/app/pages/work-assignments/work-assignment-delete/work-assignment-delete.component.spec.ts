import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAssignmentDeleteComponent } from './work-assignment-delete.component';

describe('WorkAssignmentDeleteComponent', () => {
  let component: WorkAssignmentDeleteComponent;
  let fixture: ComponentFixture<WorkAssignmentDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkAssignmentDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAssignmentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
