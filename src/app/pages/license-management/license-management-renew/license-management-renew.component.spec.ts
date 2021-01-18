import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseManagementRenewComponent } from './license-management-renew.component';

describe('LicenseManagementRenewComponent', () => {
  let component: LicenseManagementRenewComponent;
  let fixture: ComponentFixture<LicenseManagementRenewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseManagementRenewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseManagementRenewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
