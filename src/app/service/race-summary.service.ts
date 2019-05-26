import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';

import { RaceSummaryRecord } from '../record/race-summary-record';
import { raceSummaryList } from './mock/mock-race-summary-list';
import { kaisaiDtList } from './mock/mock-kaisai-dt-list';

@Injectable({
  providedIn: 'root',
})
export class RaceSummaryService {
  constructor(private http: HttpClient) {}

  getKaisaiDtList(): Promise<string[]> {
    // return Promise.resolve(kaisaiDtList);
    return this.http
      .get('http://localhost:3000/kaisai/dates')
      .pipe(first())
      .toPromise()
      .then(data => {
        console.log(data);
        return data as string[];
      })
      .catch(this.handleError);
  }

  getRaceSummaryList(kaisaiDt: string): Promise<RaceSummaryRecord[]> {
    // return Promise.resolve(raceSummaryList);
    return this.http
      .get(`http://localhost:3000/odds/summary/${kaisaiDt}`)
      .pipe(first())
      .toPromise()
      .then(data => data as RaceSummaryRecord[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error was occurred...', error);
    return Promise.reject(error);
  }
}
