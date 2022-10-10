import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { IngredientsService } from '@fim/features/ingredients/core/facades/ingredients.service';
import { Ingredient } from '@fim/features/ingredients/core/models';
import { take } from 'rxjs/operators';

@Component({
  selector: 'fim-ingredients-page',
  templateUrl: './ingredients-page.component.html',
})
export class IngredientsPageComponent {
  constructor(protected ingredientsService: IngredientsService) {
    this.ingredientsService
      .getIngredients()
      .pipe(take(1))
      .subscribe((ingredients) => {
        this.dataSource = new MatTableDataSource(ingredients);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  filter: string | null = null;

  displayedColumns: string[] = [
    'name',
    'quantityPerPackaging',
    'pricePerPackaging',
    'pricePerUnit',
    'unitOfMeasurement',
  ];

  dataSource!: MatTableDataSource<Ingredient>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  applyFilter(searchText: string) {
    this.filter = searchText;
    this.dataSource.filter = searchText.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
