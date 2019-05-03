import { Injectable } from '@angular/core';
import { UmrnOddsRecord } from '../record/umrn-odds-record';
import { TanOddsRecord } from '../record/tan-odds-record';
import { FukuOddsRecord } from '../record/fuku-odds-record';
import { TnpkOddsDiffRecord } from '../record/tnpk-odds-diff-record';
import { OddsTimeRecord } from '../record/odds-time-record';
import { umrnOddsList } from './mock/mock-umrn-odds-list';
import { tanOddsList } from './mock/mock-tan-odds-list';
import { fukuOddsList } from './mock/mock-fuku-odds-list';
import { tnpkOddsDiffList } from './mock/mock-tnpk-odds-diff-list';
import { oddsTimeList, oddsTimeMap } from './mock/mock-odds-time-list';
import { ValueLabelRecord } from '../record/value-label-record';
import { markOptions } from './mock/mock-mark-option-list';
import { KaisaiRecord } from '../record/kaisai-record';
import { kaisaiMap } from './mock/mock-kaisai-map';

@Injectable({
  providedIn: 'root',
})
export class RaceOddsService {
  constructor() {}

  getKaisaiInfo(kaisaiCd: string): Promise<KaisaiRecord> {
    return Promise.resolve(kaisaiMap[kaisaiCd]);
  }

  getOddsTimeList(kaisaiCd: string, raceNo: number): Promise<OddsTimeRecord[]> {
    return Promise.resolve(oddsTimeList);
  }

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
    return Promise.resolve(tnpkOddsDiffList);
  }

  getOddsDiffTime(oddsTimeNo: number): Promise<OddsTimeRecord> {
    return Promise.resolve(oddsTimeMap[oddsTimeNo]);
  }
  getMarkOptions(): Promise<ValueLabelRecord[]> {
    return Promise.resolve(markOptions);
  }
}
