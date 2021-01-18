import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentProgressComponent } from './attachment-progress.component';

describe('AttachmentProgressComponent', () => {
  let component: AttachmentProgressComponent;
  let fixture: ComponentFixture<AttachmentProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachmentProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
