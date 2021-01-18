import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaWidgetsComponent } from './media-widgets.component';

describe('MediaWidgetsComponent', () => {
  let component: MediaWidgetsComponent;
  let fixture: ComponentFixture<MediaWidgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaWidgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
