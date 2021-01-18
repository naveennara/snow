import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowLevelComponent } from './work-flow-level.component';

describe('WorkFlowLevelComponent', () => {
  let component: WorkFlowLevelComponent;
  let fixture: ComponentFixture<WorkFlowLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFlowLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
