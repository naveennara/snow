import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpTipsComponent } from './help-tips.component';

describe('HelpTipsComponent', () => {
  let component: HelpTipsComponent;
  let fixture: ComponentFixture<HelpTipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpTipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
