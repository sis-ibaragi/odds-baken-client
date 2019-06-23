import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgbDatepicker, NgbDateStruct, NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { RaceSummaryService } from '../service/race-summary.service';
import { RaceSummaryRecord } from '../record/race-summary-record';

@Component({
  selector: 'app-race-summary',
  templateUrl: './race-summary.component.html',
  styleUrls: ['./race-summary.component.css'],
})
export class RaceSummaryComponent implements OnInit {
  /** Datepicker */
  @ViewChild('kaisaiDp')
  kaisaiDp: NgbDatepicker;
  kaisaiDpModel: NgbDateStruct;
  displayMonths = 1;
  navigation = 'arrows';
  showWeekNumbers = false;
  outsideDays = 'visible';

  /** 開催日 */
  kaisaiDt: string;

  /** 開催日リスト */
  kaisaiDtSet: Set<string> = new Set();

  /** レース一覧 */
  raceSummaryList: RaceSummaryRecord[];

  /** Datepicker 選択可否 */
  isKaisaiDpDisabled = (date: NgbDate) => !this.isKaisaiDt(date);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngbCalendar: NgbCalendar,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private raceSummaryService: RaceSummaryService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      const kaisaiDt = param.get('kaisaiDt');
      if (kaisaiDt) {
        const date = this.ngbDateParserFormatter.parse(kaisaiDt);
        if (date && this.ngbCalendar.isValid(NgbDate.from(date))) {
          this.kaisaiDt = this.ngbDateParserFormatter.format(date);
          this.kaisaiDpModel = { year: date.year, month: date.month, day: date.day };
          this.kaisaiDp.navigateTo({ year: date.year, month: date.month });
          this.getRaceSummaryList(this.kaisaiDt);
        }
      }
      this.getKaisaiDtSet();
    });
  }

  selectDate(date: NgbDateStruct): void {
    this.router.navigate(['race-summary', this.ngbDateParserFormatter.format(date)]);
  }

  isKaisaiDt(date: NgbDate): boolean {
    return this.kaisaiDtSet.has(this.ngbDateParserFormatter.format(date));
  }

  getKaisaiDtSet(): void {
    this.raceSummaryService
      .getKaisaiDtList()
      .then(list => {
        list.forEach(record => this.kaisaiDtSet.add(record));
      })
      .then(() => {
        if (this.kaisaiDt) {
          const date = this.ngbDateParserFormatter.parse(this.kaisaiDt);
          // DatePicker に kaisaiDtSet の変更を反映させるため、いったん月移動を移動して戻す
          this.kaisaiDp.navigateTo({ year: date.year, month: date.month - 1 });
          this.kaisaiDp.navigateTo({ year: date.year, month: date.month, day: date.day });
          this.kaisaiDpModel = { year: date.year, month: date.month, day: date.day };
        } else {
          // DatePicker に kaisaiDtSet の変更を反映させるため、いったん月移動を移動して戻す
          this.kaisaiDp.navigateTo(this.ngbCalendar.getNext(this.ngbCalendar.getToday(), 'm'));
          this.kaisaiDp.navigateTo(this.ngbCalendar.getToday());
        }
      });
  }

  getRaceSummaryList(kaisaiDt: string): void {
    this.raceSummaryService.getRaceSummaryList(kaisaiDt).then(list => (this.raceSummaryList = list));
  }

  getAJdgeRslt(anaFlgCnt: number): string {
    let result: string = null;
    switch (anaFlgCnt) {
      case 3:
        result = '◎';
        break;
      case 2:
        result = '〇';
        break;
      case 1.5:
        result = '▲';
        break;
      case 1:
        result = '△';
        break;
      default:
    }
    return result;
  }
}
