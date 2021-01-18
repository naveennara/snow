import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCallResComponent } from './api-call-res.component';

describe('ApiCallResComponent', () => {
  let component: ApiCallResComponent;
  let fixture: ComponentFixture<ApiCallResComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiCallResComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCallResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
