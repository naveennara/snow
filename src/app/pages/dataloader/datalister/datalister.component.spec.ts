import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatalisterComponent } from './datalister.component';

describe('DatalisterComponent', () => {
  let component: DatalisterComponent;
  let fixture: ComponentFixture<DatalisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatalisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatalisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
