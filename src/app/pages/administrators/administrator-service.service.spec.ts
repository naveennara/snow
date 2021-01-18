import { TestBed } from '@angular/core/testing';

import { AdministratorServiceService } from './administrator-service.service';

describe('AdministratorServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdministratorServiceService = TestBed.get(AdministratorServiceService);
    expect(service).toBeTruthy();
  });
});
