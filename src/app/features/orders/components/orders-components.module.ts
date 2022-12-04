import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersPageComponent } from './orders-page';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  OrdersFormComponent
} from '../components/orders-form';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  OrdersTableComponent
} from '@fim/features/orders/components/orders-table';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SnackBarModule } from '@fim/features/snack-bar/snack-bar.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateRangeFilterComponent } from './date-range-filter/date-range-filter.component';

@NgModule({
  declarations: [
    OrdersPageComponent,
    OrdersFormComponent,
    OrdersTableComponent,
    DateRangeFilterComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTooltipModule,
    MatDatepickerModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    SnackBarModule
  ],
  providers: [MatSnackBar]
})
export class OrdersComponentsModule {}
