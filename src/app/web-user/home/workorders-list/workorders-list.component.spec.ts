import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkordersListComponent } from './workorders-list.component';

describe('WorkordersListComponent', () => {
  let component: WorkordersListComponent;
  let fixture: ComponentFixture<WorkordersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkordersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkordersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
