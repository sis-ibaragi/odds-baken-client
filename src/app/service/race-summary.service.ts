import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { RaceSummaryRecord } from '../record/race-summary-record';

@Injectable({
  providedIn: 'root',
})
export class RaceSummaryService {
  constructor(private http: HttpClient) {}

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

  getRaceSummaryList(kaisaiDt: string): Promise<RaceSummaryRecord[]> {
    return this.http
      .get(`${environment.serverUrl}/api/kaisai/${kaisaiDt}/summary`)
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
