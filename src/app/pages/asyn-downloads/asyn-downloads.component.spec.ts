import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsynDownloadsComponent } from './asyn-downloads.component';

describe('AsynDownloadsComponent', () => {
  let component: AsynDownloadsComponent;
  let fixture: ComponentFixture<AsynDownloadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsynDownloadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsynDownloadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
