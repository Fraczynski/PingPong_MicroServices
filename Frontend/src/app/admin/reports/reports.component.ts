import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ReportsService } from 'src/app/_services/reports.service';
import { ToastrService } from 'ngx-toastr';
import { ReservationStatus } from 'src/app/_models/reservation';
import { TranslatePipe } from 'src/app/_pipes/translate.pipe';
import { UserService } from 'src/app/_services/user.service';
import { TablesService } from 'src/app/_services/tables.service';

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
          beginAtZero: true,
          stepSize: 1
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    },
    tooltips: {
      callbacks: {
        afterTitle: (tooltipItem, data) => {
          if (this.type === 'userId') {
            return this.tooltips.name[tooltipItem[0].index];
          } else if (this.type === 'pingPongTableId') {
            return this.tooltips.label[tooltipItem[0].index];
          }
        },
        beforeBody: (tooltipItem, data) => {
          if (this.type === 'userId') {
            return this.tooltips.email[tooltipItem[0].index];
          } else if (this.type === 'pingPongTableId') {
            return this.tooltips.position[tooltipItem[0].index];
          }
        },
        afterBody: (tooltipItem, data) => {
          if (this.type === 'userId') {
            return this.tooltips.active[tooltipItem[0].index];
          } else if (this.type === 'pingPongTableId') {
            return this.tooltips.roomId[tooltipItem[0].index];
          }
        },
        footer: (tooltipItem, data) => {
          if (this.type === 'pingPongTableId') {
            return this.tooltips.active[tooltipItem[0].index];
          }
        },
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
  tooltips: any = {};

  red = 255;
  green = 0;
  blue = 255;

  constructor(private reportsService: ReportsService, private toastr: ToastrService, private pipe: TranslatePipe,
    private userService: UserService, private tablesService: TablesService) { }

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
      this.setColor();
      this.chartReady = true;
      this.chartName = document.getElementById(this.type).innerHTML;
      if (this.type === 'userId') {
        this.getUsersInfo();
      }
      if (this.type === 'pingPongTableId') {
        this.getTablesInfo();
      }
    }, error => {
      this.toastr.error(error);
    });
  }

  getUsersInfo() {
    this.userService.getUsersInfo(this.chartLabels).subscribe((response: any) => {
      this.tooltips.name = [];
      this.tooltips.email = [];
      this.tooltips.active = [];
      response.forEach(element => {
        this.tooltips.name.push(element.firstName + ' ' + element.lastName);
        this.tooltips.email.push(element.email);
        this.tooltips.active.push(element.active ? 'Aktywny' : 'Nieaktywny');
      });
    });
  }

  getTablesInfo() {
    this.tablesService.getTablesInfo(this.chartLabels).subscribe((response: any) => {
      this.tooltips.label = [];
      this.tooltips.position = [];
      this.tooltips.roomId = [];
      this.tooltips.active = [];
      response.forEach(element => {
        this.tooltips.label.push(element.label);
        this.tooltips.position.push('x: ' + element.x + ', y: ' + element.y);
        this.tooltips.roomId.push('Sala: ' + element.roomId);
        this.tooltips.active.push(element.active ? 'Aktywny' : 'Nieaktywny');
      });
    });
  }

  setColor() {
    const colors = [];
    this.chartLabels.forEach(() => {
      colors.push('rgba(' + this.red + ', ' + this.green + ', ' + this.blue + ', 0.7)');
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
