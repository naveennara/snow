import { TestBed } from '@angular/core/testing';

import { FormsServicesService } from './forms-services.service';

describe('FormsServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormsServicesService = TestBed.get(FormsServicesService);
    expect(service).toBeTruthy();
  });
});
