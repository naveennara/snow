import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceManagementListComponent } from './device-management-list.component';

describe('DeviceManagementListComponent', () => {
  let component: DeviceManagementListComponent;
  let fixture: ComponentFixture<DeviceManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceManagementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
