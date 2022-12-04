import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { FimDateAdapter } from '@fim/core/services/fim-date-adapter';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS
} from '@angular/material-moment-adapter';

export const dateProviders = [
  {
    provide: DateAdapter,
    useClass: FimDateAdapter,
  },
  {
    provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    useValue: { strict: true, useUtc: false },
  },
  {
    provide: MAT_DATE_FORMATS,
    useValue: {
      parse: {
        dateInput: 'LL',
      },
      display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MM/YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MM YYYY',
      },
    },
  },
];
