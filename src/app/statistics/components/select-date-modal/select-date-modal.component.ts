import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import {
  DialogService,
  DynamicDialogComponent,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-select-date-modal',
  standalone: true,
  imports: [ButtonModule, CalendarModule, ReactiveFormsModule],
  templateUrl: './select-date-modal.component.html',
  styleUrl: './select-date-modal.component.scss',
})
export class SelectDateModalComponent {
  private _formBuilder = inject(FormBuilder);
  instance: DynamicDialogComponent | undefined;

  selectByDateForm: FormGroup;
  constructor(
    public ref: DynamicDialogRef,
    public dialogService: DialogService,
    public config: DynamicDialogConfig
  ) {
    this.instance = this.dialogService.getInstance(this.ref);

    this.selectByDateForm = this._formBuilder.group({
      startDate: [this.config.data.startDate],
      endDate: [this.config.data.endDate],
    });
  }

  handleDate() {
    this.ref.close(this.selectByDateForm.value);
  }
}
