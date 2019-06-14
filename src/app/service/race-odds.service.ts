import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs/operators';

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
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getKaisaiInfo(kaisaiCd: string): Promise<KaisaiRecord> {
    // return Promise.resolve(kaisaiMap[kaisaiCd]);
    return this.http
      .get(`http://localhost:3000/kaisai/${kaisaiCd}`)
      .pipe(first())
      .toPromise()
      .then(data => data as KaisaiRecord)
      .catch(this.handleError);
  }

  getOddsTimeList(kaisaiCd: string, raceNo: number): Promise<OddsTimeRecord[]> {
    // return Promise.resolve(oddsTimeList);
    return this.http
      .get(`http://localhost:3000/odds/${kaisaiCd}/${raceNo}/odds-times`)
      .pipe(first())
      .toPromise()
      .then(data => data as OddsTimeRecord[])
      .catch(this.handleError);
  }

  getUmrnOddsList(kaisaiCd: string, raceNo: number, oddsTimeNo: number): Promise<UmrnOddsRecord[]> {
    // return Promise.resolve(umrnOddsList);
    return this.http
      .get(`http://localhost:3000/odds/${kaisaiCd}/${raceNo}/${oddsTimeNo}/umrn`)
      .pipe(first())
      .toPromise()
      .then(data => data as UmrnOddsRecord[])
      .catch(this.handleError);
  }

  getTanOddsList(kaisaiCd: string, raceNo: number, oddsTimeNo: number): Promise<TanOddsRecord[]> {
    // return Promise.resolve(tanOddsList);
    return this.http
      .get(`http://localhost:3000/odds/${kaisaiCd}/${raceNo}/${oddsTimeNo}/tan`)
      .pipe(first())
      .toPromise()
      .then(data => data as TanOddsRecord[])
      .catch(this.handleError);
  }

  getFukuOddsList(kaisaiCd: string, raceNo: number, oddsTimeNo: number): Promise<FukuOddsRecord[]> {
    // return Promise.resolve(fukuOddsList);
    return this.http
      .get(`http://localhost:3000/odds/${kaisaiCd}/${raceNo}/${oddsTimeNo}/fuku`)
      .pipe(first())
      .toPromise()
      .then(data => data as TanOddsRecord[])
      .catch(this.handleError);
  }

  getTnpkOddsDiffList(kaisaiCd: string, raceNo: number, oddsTimeNo: number): Promise<Map<number, TnpkOddsDiffRecord>> {
    // return Promise.resolve(tnpkOddsDiffList);
    return this.http
      .get(`http://localhost:3000/odds/${kaisaiCd}/${raceNo}/${oddsTimeNo}/diff`)
      .pipe(first())
      .toPromise()
      .then(data => data as TnpkOddsDiffRecord[])
      .then(list => {
        const map = new Map<number, TnpkOddsDiffRecord>();
        list.forEach(element => {
          map.set(element.umaNo, element);
        });
        return map;
      })
      .catch(this.handleError);
  }

  postUmaMark(kaisaiCd: string, raceNo: number, umaNo: number, markCd: string): void {
    this.http
      .post(`http://localhost:3000/race/mark/${kaisaiCd}/${raceNo}/${umaNo}`, { markCd }, { headers: this.headers })
      .pipe(first())
      .toPromise()
      .catch(this.handleError);
  }

  getMarkOptions(): Promise<ValueLabelRecord[]> {
    return Promise.resolve(markOptions);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error was occurred...', error);
    return Promise.reject(error);
  }
}
