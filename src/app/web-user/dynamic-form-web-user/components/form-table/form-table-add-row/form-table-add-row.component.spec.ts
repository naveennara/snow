import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTableAddRowComponent } from './form-table-add-row.component';

describe('FormTableAddRowComponent', () => {
  let component: FormTableAddRowComponent;
  let fixture: ComponentFixture<FormTableAddRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTableAddRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTableAddRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
