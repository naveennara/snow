import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseManagementCreateComponent } from './license-management-create.component';

describe('LicenseManagementCreateComponent', () => {
  let component: LicenseManagementCreateComponent;
  let fixture: ComponentFixture<LicenseManagementCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseManagementCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseManagementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
