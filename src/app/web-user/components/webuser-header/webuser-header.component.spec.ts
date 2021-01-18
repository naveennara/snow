import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebuserHeaderComponent } from './webuser-header.component';

describe('WebuserHeaderComponent', () => {
  let component: WebuserHeaderComponent;
  let fixture: ComponentFixture<WebuserHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebuserHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebuserHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
