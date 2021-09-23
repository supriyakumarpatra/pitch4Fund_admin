import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';


import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';





import { AddIndustryComponent } from './data-management/add-Industry/add-Industry.component';


import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { NgScrollbarModule } from 'ngx-scrollbar';
import { HttpClientModule } from '@angular/common/http';
import {NotifierModule, NotifierOptions} from 'angular-notifier';
import { CKEditorModule } from 'ckeditor4-angular';
import { AddInvestmentStageComponent } from './data-management/add-investment-stage/add-investment-stage.component';
import { AddCountryComponent } from './data-management/add-country/add-country.component';
import { AddLanguageComponent } from './data-management/add-language/add-language.component';
import { AddStartupVerticalComponent } from './data-management/add-startup-vertical/add-startup-vertical.component';
import { AddTimeZoneComponent } from './data-management/add-time-zone/add-time-zone.component';
import { TreditionalIndestryComponent } from './data-management/treditional-indestry/treditional-indestry.component';
import { InvestorTypeComponent } from './data-management/investor-type/investor-type.component';
import { InvestorUserComponent } from './investor/investor-user/investor-user.component';

import { StartupUserComponent } from './startup/startup-user/startup-user.component';

import { MatTooltipModule } from '@angular/material/tooltip';
import { EngagementComponent } from './data-management/engagement/engagement.component';
import { AddAdminUserComponent } from './admin-management/add-admin-user/add-admin-user.component';
import { PitchMeetingComponent } from './investor-proposed-timing/pitch-meeting/pitch-meeting.component';
import { DueDiligenceMeetingComponent } from './investor-proposed-timing/due-diligence-meeting/due-diligence-meeting.component';
import { MappingOfStartupToInvestorComponent } from './mapping/mapping-of-startup-to-investor/mapping-of-startup-to-investor.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MappingShareComponent} from './mapping-share/mapping-share.component'

/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 54,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 2000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [PagesComponent, DashboardComponent,AddIndustryComponent, AddInvestmentStageComponent, AddCountryComponent, AddLanguageComponent, AddStartupVerticalComponent, AddTimeZoneComponent, TreditionalIndestryComponent, InvestorTypeComponent, InvestorUserComponent, StartupUserComponent, EngagementComponent, AddAdminUserComponent, PitchMeetingComponent, DueDiligenceMeetingComponent, MappingOfStartupToInvestorComponent, MappingShareComponent],
  imports: [
    CommonModule,
     FormsModule,
     CKEditorModule,
    PagesRoutingModule,
    MatIconModule,
    MatExpansionModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatTabsModule,
    MatSelectModule,
    TextFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgScrollbarModule,
    HttpClientModule,
    MatRadioModule,
    NotifierModule.withConfig(customNotifierOptions),
    MatTooltipModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  entryComponents: [MappingShareComponent]
})
export class PagesModule { }
