import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkordersListViewComponent } from './workorders-list-view.component';

describe('WorkordersListViewComponent', () => {
  let component: WorkordersListViewComponent;
  let fixture: ComponentFixture<WorkordersListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkordersListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkordersListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
