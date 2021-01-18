import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCalculatorComponent } from './form-calculator.component';

describe('FormCalculatorComponent', () => {
  let component: FormCalculatorComponent;
  let fixture: ComponentFixture<FormCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
