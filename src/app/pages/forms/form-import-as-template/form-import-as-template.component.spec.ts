import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormImportAsTemplateComponent } from './form-import-as-template.component';

describe('FormImportAsTemplateComponent', () => {
  let component: FormImportAsTemplateComponent;
  let fixture: ComponentFixture<FormImportAsTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormImportAsTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormImportAsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
