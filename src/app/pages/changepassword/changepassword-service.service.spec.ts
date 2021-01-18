import { TestBed } from '@angular/core/testing';

import { ChangepasswordServiceService } from './changepassword-service.service';

describe('ChangepasswordServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangepasswordServiceService = TestBed.get(ChangepasswordServiceService);
    expect(service).toBeTruthy();
  });
});
