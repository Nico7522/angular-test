import { Component, Input, inject } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from '../../models/chart-options.model';
import { SdrStatisticsService } from '../../../sdr-statistics.service';
import { SdrByMonth } from '../../models/month-statistics.model';

@Component({
  selector: 'app-statistics-per-month',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './statistics-per-month.component.html',
  styleUrl: './statistics-per-month.component.scss',
})
export class StatisticsPerMonthComponent {
  private _sdrStatService = inject(SdrStatisticsService);
  public chartOptionsMonth: Partial<ChartOptions>;
  error: string = '';
  @Input() startDate: Date = new Date();
  @Input() endDate: Date = new Date();
  constructor() {
    this.chartOptionsMonth = {
      colors: ['#1A73E8', '#B32824'],
      series: [
        {
          name: 'My-series',
          data: [],
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          distributed: true,
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + '%';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
        },
      },
      title: {
        text: 'Pourcentage de situation dangereuses par mois',
      },
      xaxis: {
        categories: ['', ''],

        labels: {
          show: true,
          showDuplicates: true,
        },
      },
    };
  }
  ngOnInit() {
    this.getSdrPerMonth();
  }
  getSdrPerMonth() {
    this._sdrStatService.sdrPerMonth$.subscribe({
      next: (data) => {
        if (data.error) {
          this.error = 'A error has occured';
        }
        this.updateMonthChart(data.data);
      },
      error: (err) => {
        this.error = 'A error has occured';
      },
    });
  }

  updateMonthChart(stats: SdrByMonth[]) {
    let newValue: number[] = [];
    stats.forEach((stat) => {
      newValue.push(stat.value);
    });

    this.chartOptionsMonth.series = [
      {
        data: newValue,
      },
    ];

    let label: string[] = [];
    stats.forEach((stat) => {
      label.push(stat.month);
    });

    this.chartOptionsMonth.xaxis = {
      categories: label,

      labels: {
        show: true,
        showDuplicates: true,
      },
    };
  }
}
