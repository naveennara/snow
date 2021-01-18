import { TestBed } from '@angular/core/testing';

import { RestAPICallsService } from './rest-apicalls.service';

describe('RestAPICallsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestAPICallsService = TestBed.get(RestAPICallsService);
    expect(service).toBeTruthy();
  });
});
