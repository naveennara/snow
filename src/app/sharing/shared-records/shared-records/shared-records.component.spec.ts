import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedRecordsComponent } from './shared-records.component';

describe('SharedRecordsComponent', () => {
  let component: SharedRecordsComponent;
  let fixture: ComponentFixture<SharedRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
