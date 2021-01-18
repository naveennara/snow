import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowhistoryComponent } from './workflowhistory.component';

describe('WorkflowhistoryComponent', () => {
  let component: WorkflowhistoryComponent;
  let fixture: ComponentFixture<WorkflowhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
