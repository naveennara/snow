import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAssignmentCreateComponent } from './work-assignment-create.component';

describe('WorkAssignmentCreateComponent', () => {
  let component: WorkAssignmentCreateComponent;
  let fixture: ComponentFixture<WorkAssignmentCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkAssignmentCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAssignmentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
