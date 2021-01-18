import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCalendarComponent } from './form-calendar.component';

describe('FormCalendarComponent', () => {
  let component: FormCalendarComponent;
  let fixture: ComponentFixture<FormCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
