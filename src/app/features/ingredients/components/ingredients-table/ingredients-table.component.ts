import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Ingredient } from 'src/app/features/ingredients/models';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ErrorModel } from '@fim/shared/models';

@Component({
  selector: 'fim-ingredients-table',
  templateUrl: './ingredients-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsTableComponent {
  @Input()
  set data(ingredients: ReadonlyArray<Ingredient> | null) {
    this.dataSource = new MatTableDataSource<Ingredient>(
      ingredients ? [...ingredients] : []
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  @Input()
  dataLoadErrors: ErrorModel | null = null;

  @Input()
  isLoadingData: boolean | null = null;

  @Output()
  ingredientUpdate: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();

  @Output()
  ingredientDelete: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();

  dataSource!: MatTableDataSource<Ingredient>;
  filter: string | null = null;
  displayedColumns: string[] = [
    'name',
    'quantityPerPackaging',
    'pricePerPackaging',
    'pricePerUnit',
    'unitOfMeasurement',
    'action',
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  applyFilter(searchText: string) {
    this.filter = searchText;
    this.dataSource.filter = searchText.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onUpdateIngredient(ingredient: Ingredient) {
    this.ingredientUpdate.emit(ingredient);
  }

  onDeleteIngredient(ingredient: Ingredient) {
    this.ingredientDelete.emit(ingredient);
  }
}
