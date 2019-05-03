import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { NgbTabChangeEvent, NgbTabset } from '@ng-bootstrap/ng-bootstrap';

import { UmrnOddsRecord } from '../record/umrn-odds-record';
import { TanOddsRecord } from '../record/tan-odds-record';
import { FukuOddsRecord } from '../record/fuku-odds-record';
import { TnpkOddsDiffRecord } from '../record/tnpk-odds-diff-record';
import { RaceOddsService } from '../service/race-odds.service';
import { OddsTimeRecord } from '../record/odds-time-record';
import { ValueLabelRecord } from '../record/value-label-record';

@Component({
  selector: 'app-race-odds',
  templateUrl: './race-odds.component.html',
  styleUrls: ['./race-odds.component.css'],
})
export class RaceOddsComponent implements OnInit, AfterViewChecked {
  kaisaiCd: string;
  kaisaiNm: string;
  kaisaiDt: string;
  raceNo: number;

  @ViewChild('oddsTimeTabs')
  oddsTimeTabs: NgbTabset;
  selectedTab = '0';

  oddsTimeList: OddsTimeRecord[];
  umrnOddsList: UmrnOddsRecord[];
  tanOddsList: TanOddsRecord[];
  fukuOddsList: FukuOddsRecord[];
  tnpkOddsDiffList: TnpkOddsDiffRecord[];
  markOptions: ValueLabelRecord[];

  oddsDiffTimeFrom: string;
  oddsDiffTimeTo: string;

  constructor(private route: ActivatedRoute, private location: Location, private raceOddsService: RaceOddsService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.kaisaiCd = param.get('kaisaiCd');
      this.raceNo = +param.get('raceNo');
      this.getKaisaiInfo(this.kaisaiCd);
      this.getOddsTimeList(this.kaisaiCd, this.raceNo);
      this.getMarkOptions();
      this.getOddsList(this.kaisaiCd, this.raceNo, +this.selectedTab);
    });
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked was called...', this.oddsTimeTabs);
    if (this.oddsTimeTabs) {
      this.oddsTimeTabs.select(this.selectedTab);
    }
  }

  getKaisaiInfo(kaisaiCd: string): void {
    this.raceOddsService.getKaisaiInfo(kaisaiCd).then(record => {
      this.kaisaiNm = record.kaisaiNm;
      this.kaisaiDt = record.kaisaiDt;
    });
  }

  getOddsTimeList(kaisaiCd: string, raceNo: number): void {
    this.raceOddsService.getOddsTimeList(kaisaiCd, raceNo).then(list => (this.oddsTimeList = list));
  }

  getOddsList(kaisaiCd: string, raceNo: number, oddsTimeNo: number): void {
    this.umrnOddsList = [];
    this.tanOddsList = [];
    this.fukuOddsList = [];
    this.tnpkOddsDiffList = [];
    this.oddsDiffTimeFrom = null;
    this.oddsDiffTimeTo = null;

    this.raceOddsService.getUmrnOddsList(kaisaiCd, raceNo, oddsTimeNo).then(list => (this.umrnOddsList = list));
    this.raceOddsService.getTanOddsList(kaisaiCd, raceNo, oddsTimeNo).then(list => (this.tanOddsList = list));
    this.raceOddsService.getFukuOddsList(kaisaiCd, raceNo, oddsTimeNo).then(list => (this.fukuOddsList = list));
    this.getOddsDiffTime(oddsTimeNo);
    if (oddsTimeNo > 0) {
      this.raceOddsService
        .getTnpkOddsDiffList(kaisaiCd, raceNo, oddsTimeNo)
        .then(list => (this.tnpkOddsDiffList = list));
    }
  }

  getOddsDiffTime(oddsTimeNo: number): void {
    this.raceOddsService.getOddsDiffTime(oddsTimeNo).then(record => {
      this.oddsDiffTimeTo = record.tnpkOddsTime;
    });
    if (oddsTimeNo > 0) {
      this.raceOddsService.getOddsDiffTime(oddsTimeNo - 1).then(record => {
        this.oddsDiffTimeFrom = record.tnpkOddsTime;
      });
    }
  }

  getMarkOptions(): void {
    this.raceOddsService.getMarkOptions().then(list => (this.markOptions = list));
  }

  changeTab($event: NgbTabChangeEvent) {
    console.log('beforeTabChange was called... ', $event.activeId, $event.nextId);
    this.selectedTab = $event.nextId;
    this.getOddsList(this.kaisaiCd, this.raceNo, +this.selectedTab);
  }

  goBack(): void {
    this.location.back();
  }
}
