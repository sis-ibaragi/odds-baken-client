import { Component, OnInit } from '@angular/core';
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

  constructor(private raceSummaryService: RaceSummaryService) {}

  ngOnInit() {
    this.getRaceSummaryList();
  }

  getRaceSummaryList(): void {
    this.raceSummaryService.getRaceSummaryList().then(list => (this.raceSummaryList = list));
  }
}
