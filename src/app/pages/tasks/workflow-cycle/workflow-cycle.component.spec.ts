import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowCycleComponent } from './workflow-cycle.component';

describe('WorkflowCycleComponent', () => {
  let component: WorkflowCycleComponent;
  let fixture: ComponentFixture<WorkflowCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
