import { Component, Input, inject } from '@angular/core';
import { SdrStatisticsService } from '../../../sdr-statistics.service';
import { ChartOptions } from '../../models/chart-options.model';
import { SdrByCategory } from '../../models/category-statistics.model';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-statistics-per-category',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './statistics-per-category.component.html',
  styleUrl: './statistics-per-category.component.scss',
})
export class StatisticsPerCategoryComponent {
  private _sdrStatService = inject(SdrStatisticsService);
  public chartOptionsCategory: Partial<ChartOptions>;
  error: string = '';
  constructor() {
    this.chartOptionsCategory = {
      colors: ['#1A73E8', '#B32824'],
      series: [
        {
          name: 'My-series',
          data: [0, 0],
        },
      ],
      chart: {
        id: 'bycategorie',
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
        text: 'Pourcentage de situation dangereuses par cétagories',
      },
      xaxis: {
        categories: ['Pour', 'Hygière'],

        labels: {
          show: true,
          showDuplicates: true,
        },
      },
    };
  }

  @Input() startDate: Date = new Date();
  @Input() endDate: Date = new Date();
  ngOnInit() {
    this.getSdrPerCategory();
  }
  getSdrPerCategory() {
    this._sdrStatService.sdrPerCategory$.subscribe({
      next: (data) => {
        if (data.error) {
          this.error = 'A error has occured for the category statistics';
        }
        this.updateCategoryChart(data.data);
      },
      error: (err) => {
        this.error = 'A error has occured for the category statistics';
      },
    });
  }

  updateCategoryChart(data: SdrByCategory[]) {
    let newValue: number[] = [];
    data.forEach((stat) => {
      newValue.push(stat.value);
    });

    this.chartOptionsCategory.series = [
      {
        data: newValue,
      },
    ];

    let label: string[] = [];
    data.forEach((stat) => {
      label.push(stat.category);
    });

    this.chartOptionsCategory.xaxis = {
      categories: label,

      labels: {
        show: true,
        showDuplicates: true,
      },
    };
  }
}
