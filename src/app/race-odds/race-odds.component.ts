import { Component, OnInit } from '@angular/core';

import { UmrnOddsRecord } from '../record/umrn-odds-record';
import { TanOddsRecord } from '../record/tan-odds-record';
import { FukuOddsRecord } from '../record/fuku-odds-record';
import { TnpkOddsDiffRecord } from '../record/tnpk-odds-diff-record';
import { RaceOddsService } from '../service/race-odds.service';

@Component({
  selector: 'app-race-odds',
  templateUrl: './race-odds.component.html',
  styleUrls: ['./race-odds.component.css'],
})
export class RaceOddsComponent implements OnInit {
  kaisaiCd: string;
  raceNo: number;

  umrnOddsList1: UmrnOddsRecord[];
  tanOddsList1: TanOddsRecord[];
  fukuOddsList1: FukuOddsRecord[];
  tnpkOddsDiffList1: TnpkOddsDiffRecord[];

  umrnOddsList2: UmrnOddsRecord[];
  tanOddsList2: TanOddsRecord[];
  fukuOddsList2: FukuOddsRecord[];
  tnpkOddsDiffList2: TnpkOddsDiffRecord[];

  constructor(private raceOddsService: RaceOddsService) {}

  ngOnInit() {
    this.getOddsList();
  }

  getOddsList(): void {
    this.raceOddsService.getUmrnOddsList(this.kaisaiCd, this.raceNo, 1).then(list => (this.umrnOddsList1 = list));
    this.raceOddsService.getTanOddsList(this.kaisaiCd, this.raceNo, 1).then(list => (this.tanOddsList1 = list));
    this.raceOddsService.getFukuOddsList(this.kaisaiCd, this.raceNo, 1).then(list => (this.fukuOddsList1 = list));
    this.raceOddsService
      .getTnpkOddsDiffList(this.kaisaiCd, this.raceNo, 1)
      .then(list => (this.tnpkOddsDiffList1 = list));

    this.raceOddsService.getUmrnOddsList(this.kaisaiCd, this.raceNo, 2).then(list => (this.umrnOddsList2 = list));
    this.raceOddsService.getTanOddsList(this.kaisaiCd, this.raceNo, 2).then(list => (this.tanOddsList2 = list));
    this.raceOddsService.getFukuOddsList(this.kaisaiCd, this.raceNo, 2).then(list => (this.fukuOddsList2 = list));
    this.raceOddsService
      .getTnpkOddsDiffList(this.kaisaiCd, this.raceNo, 2)
      .then(list => (this.tnpkOddsDiffList2 = list));
  }
}
