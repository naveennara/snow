import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCalculationComponent } from './form-calculation.component';

describe('FormCalculationComponent', () => {
  let component: FormCalculationComponent;
  let fixture: ComponentFixture<FormCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
