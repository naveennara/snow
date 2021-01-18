import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonFormactionViewComponent } from './common-formaction-view.component';

describe('CommonFormactionViewComponent', () => {
  let component: CommonFormactionViewComponent;
  let fixture: ComponentFixture<CommonFormactionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonFormactionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonFormactionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
