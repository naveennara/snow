import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebuserSideLayoutComponent } from './webuser-side-layout.component';

describe('WebuserSideLayoutComponent', () => {
  let component: WebuserSideLayoutComponent;
  let fixture: ComponentFixture<WebuserSideLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebuserSideLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebuserSideLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
