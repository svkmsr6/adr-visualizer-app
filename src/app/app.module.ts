import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FetchAdrService } from '../app/services/fetch-adr.service';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import { AppComponent } from './app.component';
import { AdrDashboardComponent } from './components/adr-dashboard/adr-dashboard.component';

export function highchartsModules() {
  return [more];
}


@NgModule({
  declarations: [
    AppComponent,
    AdrDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule
  ],
  providers: [
    FetchAdrService,
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
