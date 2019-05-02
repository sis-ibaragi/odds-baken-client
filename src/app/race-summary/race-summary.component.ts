import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { RaceSummaryService } from '../service/race-summary.service';
import { RaceSummaryRecord } from '../record/race-summary-record';

@Component({
  selector: 'app-race-summary',
  templateUrl: './race-summary.component.html',
  styleUrls: ['./race-summary.component.css'],
})
export class RaceSummaryComponent implements OnInit {
  /** レース一覧 */
  raceSummaryList: RaceSummaryRecord[];

  constructor(private route: ActivatedRoute, private raceSummaryService: RaceSummaryService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      return this.getRaceSummaryList(param.get('kaisaiDt'));
    });
  }

  getRaceSummaryList(kaisaiDt: string): void {
    this.raceSummaryService.getRaceSummaryList(kaisaiDt).then(list => (this.raceSummaryList = list));
  }
}
