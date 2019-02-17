import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RaceSummaryComponent } from './race-summary/race-summary.component';

@NgModule({
  declarations: [AppComponent, RaceSummaryComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
