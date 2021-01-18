import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowCreateComponent } from './work-flow-create.component';

describe('WorkFlowCreateComponent', () => {
  let component: WorkFlowCreateComponent;
  let fixture: ComponentFixture<WorkFlowCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFlowCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
