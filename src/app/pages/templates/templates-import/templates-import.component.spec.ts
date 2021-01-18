import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesImportComponent } from './templates-import.component';

describe('TemplatesImportComponent', () => {
  let component: TemplatesImportComponent;
  let fixture: ComponentFixture<TemplatesImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatesImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatesImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
