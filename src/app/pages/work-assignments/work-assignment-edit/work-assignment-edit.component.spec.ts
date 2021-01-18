import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAssignmentEditComponent } from './work-assignment-edit.component';

describe('WorkAssignmentEditComponent', () => {
  let component: WorkAssignmentEditComponent;
  let fixture: ComponentFixture<WorkAssignmentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkAssignmentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAssignmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
