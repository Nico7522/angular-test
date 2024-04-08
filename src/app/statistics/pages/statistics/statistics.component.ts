import { Component, ViewChild, inject } from '@angular/core';
import { SdrStatisticsService } from '../../../sdr-statistics.service';
import { CalendarModule } from 'primeng/calendar';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  NgApexchartsModule,
  ApexPlotOptions,
  ApexDataLabels,
} from 'ng-apexcharts';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { SelectDateModalComponent } from '../../components/select-date-modal/select-date-modal.component';
import { take } from 'rxjs';
import { SdrByMonth } from '../../models/month-statistics.model';
import { StatisticsPerCategoryComponent } from '../../components/statistics-per-category/statistics-per-category.component';
import { StatisticsPerMonthComponent } from '../../components/statistics-per-month/statistics-per-month.component';
type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  colors: string[];
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
};
@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    CalendarModule,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    SelectDateModalComponent,
    StatisticsPerCategoryComponent,
    StatisticsPerMonthComponent,
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
  providers: [DialogService],
})
export class StatisticsComponent {
  ref: DynamicDialogRef | undefined;

  startDate: Date;
  endDate: Date;
  constructor(public dialogService: DialogService) {
    this.startDate = new Date();
    this.endDate = new Date();
  }
  private _sdrStatsService = inject(SdrStatisticsService);

  ngOnInit() {
    this.startDate = new Date(
      this.startDate.setMonth(this.startDate.getMonth() - 1)
    );

    this.getSdrPerCategory(this.startDate, this.endDate);
    this.getSdrPerMonth(this.startDate, this.endDate);
  }

  getSdrPerCategory(startDate: Date, endDate: Date) {
    let formatedStartDate = this.formatDate(startDate);
    let formatedEndDate = this.formatDate(endDate);
    this._sdrStatsService
      .getSdrPerCategory(formatedStartDate, formatedEndDate)
      .pipe(take(1))
      .subscribe();
  }

  getSdrPerMonth(startDate: Date, endDate: Date) {
    let formatedStartDate = this.formatDate(startDate);
    let formatedEndDate = this.formatDate(endDate);
    this._sdrStatsService
      .getSdrPerMonth(formatedStartDate, formatedEndDate)
      .pipe(take(1))
      .subscribe();
  }

  private formatDate(date: Date): string {
    return date.toISOString().replaceAll('-', '/').substring(0, 10);
  }

  showModal() {
    this.ref = this.dialogService.open(SelectDateModalComponent, {
      header: 'Choisir les dates',
      width: '50vw',
      height: '500px',
      modal: true,
      data: {
        // Renvoie les données reçues précédemment pour initier le formulaire
        startDate: this.startDate,
        endDate: this.endDate,
      },
    });

    this.ref.onClose.subscribe({
      next: (data) => {
        if (data) {
          // Save les données reçues par la modal.
          this.startDate = data.startDate;
          this.endDate = data.endDate;
          this.getSdrPerCategory(data.startDate, data.endDate);
          this.getSdrPerMonth(data.startDate, data.endDate);
        }
      },
    });
  }
}
