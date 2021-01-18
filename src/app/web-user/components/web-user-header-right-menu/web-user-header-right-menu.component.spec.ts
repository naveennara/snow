import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebUserHeaderRightMenuComponent } from './web-user-header-right-menu.component';

describe('WebUserHeaderRightMenuComponent', () => {
  let component: WebUserHeaderRightMenuComponent;
  let fixture: ComponentFixture<WebUserHeaderRightMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebUserHeaderRightMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebUserHeaderRightMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
