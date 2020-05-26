import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ReportsService } from 'src/app/_services/reports.service';
import { HttpResponseBase } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ReservationStatus } from 'src/app/_models/reservation';
import { TranslatePipe } from 'src/app/_pipes/translate.pipe';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  public ChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{}], yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public ChartType: ChartType = 'bar';
  public ChartLegend = false;

  public chartLabels: Label[];
  public chartData: ChartDataSets[];
  public chartColors;
  chartReady = false;
  chartName: string;
  reportParams: any = {};
  ReservationStatus = ReservationStatus;
  type = 'userId';

  constructor(private reportsService: ReportsService, private toastr: ToastrService, private pipe: TranslatePipe) { }

  ngOnInit() {
    this.getReport();
  }

  getReport(type?) {
    if (type !== undefined) {
      this.type = type;
    }
    this.reportParams.type = this.type;
    this.reportsService.getReport(this.reportParams).subscribe((report: any[]) => {
      const namesArray = [];
      const valuesArray = [];
      report.forEach((element) => {
        const translatedName = this.pipe.transform(element.item1);
        namesArray.push(translatedName === undefined ? element.item1 : translatedName);
        valuesArray.push(element.item2);
      });
      this.chartData = [{ data: valuesArray }];
      this.chartLabels = namesArray;
      this.setColors(report);
      this.chartReady = true;
      this.chartName = document.getElementById(this.type).innerHTML;
    }, error => {
      this.toastr.error(error);
    });
  }

  setColors(report) {
    const colors = [];
    const red = 32;
    const green = 38;
    const blue = 44;
    report.forEach(() => {
      colors.push('rgba(' + red + ', ' + green + ', ' + blue + ', 0.7)');
    });
    this.chartColors = [{ backgroundColor: colors }];
  }

  resetFilters() {
    this.reportParams.userId = '';
    this.reportParams.pingPongTableId = '';
    this.reportParams.minDate = '';
    this.reportParams.maxDate = '';
    this.reportParams.reservationStatus = '';
    this.getReport();
  }
}
