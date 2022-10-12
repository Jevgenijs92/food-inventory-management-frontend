import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientsPageComponent } from './ingredients-page';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CdkColumnDef } from '@angular/cdk/table';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { IngredientsFormComponent } from './ingredients-form/ingredients-form.component';
import { IngredientsTableComponent } from './ingredients-table/ingredients-table.component';

@NgModule({
  declarations: [IngredientsPageComponent, IngredientsFormComponent, IngredientsTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
  ],
  providers: [CdkColumnDef],
})
export class IngredientsComponentsModule {}
