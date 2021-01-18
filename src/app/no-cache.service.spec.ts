import { TestBed } from '@angular/core/testing';

import { NoCacheService } from './no-cache.service';

describe('NoCacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoCacheService = TestBed.get(NoCacheService);
    expect(service).toBeTruthy();
  });
});
