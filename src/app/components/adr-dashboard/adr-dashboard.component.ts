import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-adr-dashboard',
  templateUrl: './adr-dashboard.component.html',
  styleUrls: ['./adr-dashboard.component.css']
})
export class AdrDashboardComponent implements OnInit {

  @Input()chartData: Array<any>;
  enableChart = false;
  placeHolderMsg = 'ADR TREND RESULT GOES HERE';
  adrChart: Chart;
  adrChartConfig: any = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'ADR Request Trends'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      title: 'Date(s)',
      categories: []
    },
    series: [{
      name: 'Requests',
      data: []
    }]
  };

  constructor() { }

  ngOnInit() { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges) {
    // for (let propName in changes) {
      const chngObj = changes['chartData'];
      const dataArray  = chngObj.currentValue;
      if (dataArray && dataArray.map) {
        this.adrChartConfig.xAxis.categories = dataArray.map(item => item.date);
        this.adrChartConfig.series[0].data = dataArray.map(item => item.adrequest);
        this.adrChart = new Chart(this.adrChartConfig);
        this.enableChart = true;
      } else {
        if (dataArray) {
          this.placeHolderMsg = dataArray.msg;
        }
        this.enableChart = false;
      }
    // }
   }

}
