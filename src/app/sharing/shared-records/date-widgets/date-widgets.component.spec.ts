import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateWidgetsComponent } from './date-widgets.component';

describe('DateWidgetsComponent', () => {
  let component: DateWidgetsComponent;
  let fixture: ComponentFixture<DateWidgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateWidgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
