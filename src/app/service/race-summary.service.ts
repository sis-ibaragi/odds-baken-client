import { Injectable } from '@angular/core';
import { RaceSummaryRecord } from '../record/race-summary-record';
import { raceSummaryList } from './mock/mock-race-summary-list';
import { kaisaiDtList } from './mock/mock-kaisai-dt-list';

@Injectable({
  providedIn: 'root',
})
export class RaceSummaryService {
  constructor() {}

  getKaisaiDtList(): Promise<string[]> {
    return Promise.resolve(kaisaiDtList);
  }

  getRaceSummaryList(kaisaiDt: string): Promise<RaceSummaryRecord[]> {
    return Promise.resolve(raceSummaryList);
  }
}
