import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditModalComponent } from './form-edit-modal.component';

describe('FormEditModalComponent', () => {
  let component: FormEditModalComponent;
  let fixture: ComponentFixture<FormEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
