import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RaceSummaryComponent } from './race-summary/race-summary.component';
import { RaceOddsComponent } from './race-odds/race-odds.component';

@NgModule({
  declarations: [AppComponent, RaceSummaryComponent, RaceOddsComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
