import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesDeleteComponent } from './templates-delete.component';

describe('TemplatesDeleteComponent', () => {
  let component: TemplatesDeleteComponent;
  let fixture: ComponentFixture<TemplatesDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatesDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
