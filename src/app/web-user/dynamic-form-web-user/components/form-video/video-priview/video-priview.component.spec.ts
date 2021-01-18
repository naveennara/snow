import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPriviewComponent } from './video-priview.component';

describe('VideoPriviewComponent', () => {
  let component: VideoPriviewComponent;
  let fixture: ComponentFixture<VideoPriviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoPriviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPriviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
