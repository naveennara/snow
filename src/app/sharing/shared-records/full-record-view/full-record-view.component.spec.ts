import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullRecordViewComponent } from './full-record-view.component';

describe('FullRecordViewComponent', () => {
  let component: FullRecordViewComponent;
  let fixture: ComponentFixture<FullRecordViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullRecordViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullRecordViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
