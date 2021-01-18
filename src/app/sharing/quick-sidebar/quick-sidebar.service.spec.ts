import { TestBed } from '@angular/core/testing';

import { QuickSidebarService } from './quick-sidebar.service';

describe('QuickSidebarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuickSidebarService = TestBed.get(QuickSidebarService);
    expect(service).toBeTruthy();
  });
});
