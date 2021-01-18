import { TestBed } from '@angular/core/testing';

import { LicenseManagementService } from './license-management.service';

describe('LicenseManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LicenseManagementService = TestBed.get(LicenseManagementService);
    expect(service).toBeTruthy();
  });
});
