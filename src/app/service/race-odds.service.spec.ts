import { TestBed } from '@angular/core/testing';

import { RaceOddsService } from './race-odds.service';

describe('RaceOddsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RaceOddsService = TestBed.get(RaceOddsService);
    expect(service).toBeTruthy();
  });
});
