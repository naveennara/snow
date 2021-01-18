import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFeedComponent } from './dashboard-feed.component';

describe('DashboardFeedComponent', () => {
  let component: DashboardFeedComponent;
  let fixture: ComponentFixture<DashboardFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
