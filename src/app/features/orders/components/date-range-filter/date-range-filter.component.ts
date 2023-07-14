import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { OrderFilters } from '@fim/features/orders/core/models';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'fim-date-range-filter',
  templateUrl: './date-range-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeFilterComponent {
  @Input() filters: OrderFilters | null | undefined;

  @Output() fromDateChange: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() toDateChange: EventEmitter<Date> = new EventEmitter<Date>();

  onFromDateChange(event: MatDatepickerInputEvent<moment.Moment>) {
    this.fromDateChange.emit(event.value?.toDate());
  }

  onToDateChange(event: MatDatepickerInputEvent<moment.Moment>) {
    this.toDateChange.emit(event.value?.toDate());
  }
}
