import { TestBed } from '@angular/core/testing';

import { SessionPrefsService } from './session-prefs.service';

describe('SessionPrefsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionPrefsService = TestBed.get(SessionPrefsService);
    expect(service).toBeTruthy();
  });
});
