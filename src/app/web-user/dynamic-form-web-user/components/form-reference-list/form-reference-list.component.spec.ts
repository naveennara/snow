import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReferenceListComponent } from './form-reference-list.component';

describe('FormReferenceListComponent', () => {
  let component: FormReferenceListComponent;
  let fixture: ComponentFixture<FormReferenceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormReferenceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormReferenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
