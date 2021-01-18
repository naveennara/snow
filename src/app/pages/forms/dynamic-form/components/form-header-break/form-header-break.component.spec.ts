import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHeaderBreakComponent } from './form-header-break.component';

describe('FormHeaderBreakComponent', () => {
  let component: FormHeaderBreakComponent;
  let fixture: ComponentFixture<FormHeaderBreakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormHeaderBreakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHeaderBreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
