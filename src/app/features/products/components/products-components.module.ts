import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './products-page';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductsTableComponent } from './products-table/products-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductsFormComponent } from './products-form/products-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CdkColumnDef } from '@angular/cdk/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarModule } from '@fim/features/snack-bar/snack-bar.module';

@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductsTableComponent,
    ProductsFormComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule,
    SnackBarModule
  ],
  providers: [CdkColumnDef, MatSnackBar],
})
export class ProductsComponentsModule {}
