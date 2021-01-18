import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesCreateComponent } from './templates-create.component';

describe('TemplatesCreateComponent', () => {
  let component: TemplatesCreateComponent;
  let fixture: ComponentFixture<TemplatesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
