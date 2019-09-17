import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { UmrnOddsRecord } from '../record/umrn-odds-record';
import { TanOddsRecord } from '../record/tan-odds-record';
import { FukuOddsRecord } from '../record/fuku-odds-record';
import { TnpkOddsDiffRecord } from '../record/tnpk-odds-diff-record';
import { OddsTimeRecord } from '../record/odds-time-record';
import { ValueLabelRecord } from '../record/value-label-record';
import { markOptions } from './mock/mock-mark-option-list';
import { KaisaiRecord } from '../record/kaisai-record';
import { RaceUmaRecord } from '../record/race-uma-record';

@Injectable({
  providedIn: 'root',
})
export class RaceOddsService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getKaisaiInfo(kaisaiCd: string): Promise<KaisaiRecord> {
    return this.http
      .get(`${environment.serverUrl}/api/kaisai/${kaisaiCd}`)
      .pipe(first())
      .toPromise()
      .then(data => data as KaisaiRecord)
      .catch(this.handleError);
  }

  getOddsTimeList(kaisaiCd: string, raceNo: number): Promise<OddsTimeRecord[]> {
    return this.http
      .get(`${environment.serverUrl}/api/race/odds/${kaisaiCd}/${raceNo}/times`)
      .pipe(first())
      .toPromise()
      .then(data => data as OddsTimeRecord[])
      .catch(this.handleError);
  }

  getUmrnOddsList(kaisaiCd: string, raceNo: number, oddsTimeNo: number): Promise<UmrnOddsRecord[]> {
    return this.http
      .get(`${environment.serverUrl}/api/race/odds/${kaisaiCd}/${raceNo}/${oddsTimeNo}/umrn`)
      .pipe(first())
      .toPromise()
      .then(data => data as UmrnOddsRecord[])
      .catch(this.handleError);
  }

  getTanOddsList(kaisaiCd: string, raceNo: number, oddsTimeNo: number): Promise<TanOddsRecord[]> {
    return this.http
      .get(`${environment.serverUrl}/api/race/odds/${kaisaiCd}/${raceNo}/${oddsTimeNo}/tan`)
      .pipe(first())
      .toPromise()
      .then(data => data as TanOddsRecord[])
      .catch(this.handleError);
  }

  getFukuOddsList(kaisaiCd: string, raceNo: number, oddsTimeNo: number): Promise<FukuOddsRecord[]> {
    return this.http
      .get(`${environment.serverUrl}/api/race/odds/${kaisaiCd}/${raceNo}/${oddsTimeNo}/fuku`)
      .pipe(first())
      .toPromise()
      .then(data => data as TanOddsRecord[])
      .catch(this.handleError);
  }

  getTnpkOddsDiffList(kaisaiCd: string, raceNo: number, oddsTimeNo: number): Promise<Map<number, TnpkOddsDiffRecord>> {
    return this.http
      .get(`${environment.serverUrl}/api/race/odds/${kaisaiCd}/${raceNo}/${oddsTimeNo}/diff`)
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

  getRaceUmaList(kaisaiCd: string, raceNo: number): Promise<Map<number, RaceUmaRecord>> {
    return this.http
      .get(`${environment.serverUrl}/api/race/odds/${kaisaiCd}/${raceNo}/umalist`)
      .pipe(first())
      .toPromise().then(data => data as RaceUmaRecord[])
      .then(list => {
        const map = new Map<number, RaceUmaRecord>();
        list.forEach(element => {
          map.set(element.umaNo, element);
        });
        return map;
      }).catch(this.handleError);
  }

  postUmaMark(kaisaiCd: string, raceNo: number, umaNo: number, markCd: string): void {
    this.http
      .post(
        `${environment.serverUrl}/api/race/odds/${kaisaiCd}/${raceNo}/${umaNo}/mark`,
        { markCd },
        { headers: this.headers }
      )
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
