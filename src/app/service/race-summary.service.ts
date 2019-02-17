import { Injectable } from '@angular/core';
import { RaceSummaryRecord } from '../record/race-summary-record';
import { RaceSummaryList } from './mock/mock-race-summary-list';

@Injectable({
  providedIn: 'root',
})
export class RaceSummaryService {
  constructor() {}

  getRaceSummaryList(): Promise<RaceSummaryRecord[]> {
    return Promise.resolve(RaceSummaryList);
  }
}
