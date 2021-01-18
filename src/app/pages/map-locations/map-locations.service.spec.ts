import { TestBed } from '@angular/core/testing';

import { MapLocationsService } from './map-locations.service';

describe('MapLocationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapLocationsService = TestBed.get(MapLocationsService);
    expect(service).toBeTruthy();
  });
});
