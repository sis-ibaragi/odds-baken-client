import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RaceSummaryComponent } from './race-summary/race-summary.component';
import { RaceOddsComponent } from './race-odds/race-odds.component';

const routes: Routes = [
  { path: 'race-summary', component: RaceSummaryComponent },
  { path: 'race-odds', component: RaceOddsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
