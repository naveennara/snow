import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonFormLabelsComponent } from './common-form-labels.component';

describe('CommonFormLabelsComponent', () => {
  let component: CommonFormLabelsComponent;
  let fixture: ComponentFixture<CommonFormLabelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonFormLabelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonFormLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
