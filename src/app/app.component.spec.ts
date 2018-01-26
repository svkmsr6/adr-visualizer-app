import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FetchAdrService } from '../app/services/fetch-adr.service';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import { AppComponent } from './app.component';
import { AdrDashboardComponent } from './components/adr-dashboard/adr-dashboard.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
        { provide: HIGHCHARTS_MODULES, useFactory: function () {
          return [more];
        } }
      ]
    }).compileComponents();
  }));
  
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'ADR REQUEST DASHBOARD'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ADR REQUEST DASHBOARD');
  })); 
});
