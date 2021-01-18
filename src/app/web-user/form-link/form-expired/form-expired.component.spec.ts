import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormExpiredComponent } from './form-expired.component';

describe('FormExpiredComponent', () => {
  let component: FormExpiredComponent;
  let fixture: ComponentFixture<FormExpiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormExpiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
