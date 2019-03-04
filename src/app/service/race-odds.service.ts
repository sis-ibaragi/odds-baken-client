import { Injectable } from '@angular/core';
import { UmrnOddsRecord } from '../record/umrn-odds-record';
import { TanOddsRecord } from '../record/tan-odds-record';
import { FukuOddsRecord } from '../record/fuku-odds-record';
import { TnpkOddsDiffRecord } from '../record/tnpk-odds-diff-record';
import { umrnOddsList } from './mock/mock-umrn-odds-list';
import { tanOddsList } from './mock/mock-tan-odds-list';
import { fukuOddsList } from './mock/mock-fuku-odds-list';
import { TnpkOddsDiffList } from './mock/mock-tnpk-odds-diff-list';

@Injectable({
  providedIn: 'root',
})
export class RaceOddsService {
  constructor() {}

  getUmrnOddsList(kaisaiCd: string, raceNo: number, oddsTimeNo: number): Promise<UmrnOddsRecord[]> {
    return Promise.resolve(umrnOddsList);
  }

  getTanOddsList(kaisaiCd: string, raceNo: number, oddsTimeNo: number): Promise<TanOddsRecord[]> {
    return Promise.resolve(tanOddsList);
  }

  getFukuOddsList(kaisaiCd: string, raceNo: number, oddsTimeNo: number): Promise<FukuOddsRecord[]> {
    return Promise.resolve(fukuOddsList);
  }

  getTnpkOddsDiffList(kaisaiCd: string, raceNo: number, oddsTimeNo: number): Promise<TnpkOddsDiffRecord[]> {
    return Promise.resolve(TnpkOddsDiffList);
  }
}
