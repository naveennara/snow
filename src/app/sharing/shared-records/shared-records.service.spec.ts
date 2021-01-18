import { TestBed } from '@angular/core/testing';

import { SharedRecordsService } from './shared-records.service';

describe('SharedRecordsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedRecordsService = TestBed.get(SharedRecordsService);
    expect(service).toBeTruthy();
  });
});
