import { TestBed } from '@angular/core/testing';

import { RaceSummaryService } from './race-summary.service';

describe('RaceSummaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RaceSummaryService = TestBed.get(RaceSummaryService);
    expect(service).toBeTruthy();
  });
});
