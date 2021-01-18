import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesEditComponent } from './templates-edit.component';

describe('TemplatesEditComponent', () => {
  let component: TemplatesEditComponent;
  let fixture: ComponentFixture<TemplatesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
