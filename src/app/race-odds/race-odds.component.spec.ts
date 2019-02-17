import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceOddsComponent } from './race-odds.component';

describe('RaceOddsComponent', () => {
  let component: RaceOddsComponent;
  let fixture: ComponentFixture<RaceOddsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceOddsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceOddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
