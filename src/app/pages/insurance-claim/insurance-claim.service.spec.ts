import { TestBed } from '@angular/core/testing';

import { InsuranceClaimService } from './insurance-claim.service';

describe('InsuranceClaimService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsuranceClaimService = TestBed.get(InsuranceClaimService);
    expect(service).toBeTruthy();
  });
});
