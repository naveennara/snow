import { TestBed } from '@angular/core/testing';

import { AsyncDownloadService } from './async-download.service';

describe('AsyncDownloadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsyncDownloadService = TestBed.get(AsyncDownloadService);
    expect(service).toBeTruthy();
  });
});
