import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RaceSummaryComponent } from './race-summary/race-summary.component';

const routes: Routes = [{ path: 'race-summary', component: RaceSummaryComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
