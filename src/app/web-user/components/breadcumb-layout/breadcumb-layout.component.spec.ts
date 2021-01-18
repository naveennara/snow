import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcumbLayoutComponent } from './breadcumb-layout.component';

describe('BreadcumbLayoutComponent', () => {
  let component: BreadcumbLayoutComponent;
  let fixture: ComponentFixture<BreadcumbLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadcumbLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcumbLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
