import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseManagementListComponent } from './license-management-list.component';

describe('LicenseManagementListComponent', () => {
  let component: LicenseManagementListComponent;
  let fixture: ComponentFixture<LicenseManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseManagementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
