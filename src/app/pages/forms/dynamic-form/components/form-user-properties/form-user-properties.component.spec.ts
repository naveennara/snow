import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserPropertiesComponent } from './form-user-properties.component';

describe('FormUserPropertiesComponent', () => {
  let component: FormUserPropertiesComponent;
  let fixture: ComponentFixture<FormUserPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUserPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUserPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
