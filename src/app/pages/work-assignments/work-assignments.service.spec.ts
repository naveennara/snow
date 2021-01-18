import { TestBed } from '@angular/core/testing';

import { WorkAssignmentsService } from './work-assignments.service';

describe('WorkAssignmentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkAssignmentsService = TestBed.get(WorkAssignmentsService);
    expect(service).toBeTruthy();
  });
});
