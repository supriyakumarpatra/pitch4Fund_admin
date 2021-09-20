import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddInvestmentStageComponent } from './data-management/add-investment-stage/add-investment-stage.component';
import { AddCountryComponent } from './data-management/add-country/add-country.component';
import { AddLanguageComponent } from './data-management/add-language/add-language.component';
import { AddStartupVerticalComponent } from './data-management/add-startup-vertical/add-startup-vertical.component';
import { AddIndustryComponent } from './data-management/add-Industry/add-Industry.component';
import { AddTimeZoneComponent } from './data-management/add-time-zone/add-time-zone.component';
import { TreditionalIndestryComponent } from './data-management/treditional-indestry/treditional-indestry.component';
import { InvestorTypeComponent } from './data-management/investor-type/investor-type.component';
import { InvestorUserComponent } from './investor/investor-user/investor-user.component';
import { StartupUserComponent } from './startup/startup-user/startup-user.component';
import { EngagementComponent } from './data-management/engagement/engagement.component';
import { AddAdminUserComponent } from './admin-management/add-admin-user/add-admin-user.component';
import { PitchMeetingComponent } from './investor-proposed-timing/pitch-meeting/pitch-meeting.component';
import { DueDiligenceMeetingComponent } from './investor-proposed-timing/due-diligence-meeting/due-diligence-meeting.component';
import { MappingOfStartupToInvestorComponent } from './mapping/mapping-of-startup-to-investor/mapping-of-startup-to-investor.component';


const routes: Routes = [{ path: '', component: PagesComponent,
children: [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'data-management/add-Industry', component: AddIndustryComponent},
  {path: 'data-management/add-investment-stage', component: AddInvestmentStageComponent},
  {path: 'data-management/add-country', component: AddCountryComponent},
  {path: 'data-management/add-language', component: AddLanguageComponent},
  {path: 'data-management/add-startup-vertical', component: AddStartupVerticalComponent},
  {path: 'data-management/add-time-zone', component: AddTimeZoneComponent},
  {path: 'data-management/add-treditional-indestry', component: TreditionalIndestryComponent},
  {path: 'data-management/add-investor-type', component: InvestorTypeComponent},
  {path: 'data-management/add-engagement', component: EngagementComponent},
  {path: 'investor/investor-user', component: InvestorUserComponent},
  {path: 'startup/startup-user', component: StartupUserComponent},
  {path: 'admin-management/add-admin-user', component: AddAdminUserComponent},
  {path: 'investor-proposed-timing/pitch-meeting', component: PitchMeetingComponent},
  {path: 'investor-proposed-timing/due-diligence-meeting', component: DueDiligenceMeetingComponent},
  {path: 'mapping/mapping-of-startup-to-investor', component: MappingOfStartupToInvestorComponent}

 


]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
