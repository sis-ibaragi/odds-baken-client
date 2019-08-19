import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { RaceSummaryRecord } from '../record/race-summary-record';
import { KaisaiRecord } from '../record/kaisai-record';

@Injectable({
  providedIn: 'root',
})
export class RaceSummaryService {
  constructor(private http: HttpClient) { }

  getKaisaiDtList(): Promise<string[]> {
    return this.http
      .get(`${environment.serverUrl}/api/kaisai/dates`)
      .pipe(first())
      .toPromise()
      .then(data => {
        console.log(data);
        return data as string[];
      })
      .catch(this.handleError);
  }

  getKaisaiList(kaisaiDt: string): Promise<KaisaiRecord[]> {
    return this.http
      .get(`${environment.serverUrl}/api/kaisai/${kaisaiDt}`)
      .pipe(first())
      .toPromise()
      .then(data => data as KaisaiRecord[])
      .catch(this.handleError);
  }

  getRaceSummaryList(kaisaiCd: string): Promise<RaceSummaryRecord[]> {
    return this.http
      .get(`${environment.serverUrl}/api/kaisai/${kaisaiCd}/summary`)
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
