import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Ingredient } from '@fim/features/ingredients/core/models';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { IngredientsFormComponent } from '@fim/features/ingredients/components/ingredients-form';

@Component({
  selector: 'fim-ingredients-table',
  templateUrl: './ingredients-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsTableComponent {
  constructor(protected dialog: MatDialog) {}

  @Input()
  set data(ingredients: Ingredient[] | null) {
    this.dataSource = new MatTableDataSource<Ingredient>(ingredients ?? []);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  dataSource!: MatTableDataSource<Ingredient>;
  filter: string | null = null;
  displayedColumns: string[] = [
    'name',
    'quantityPerPackaging',
    'pricePerPackaging',
    'pricePerUnit',
    'unitOfMeasurement',
    'action'
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
    const dialogRef = this.dialog.open(IngredientsFormComponent);
    dialogRef.componentInstance.ingredient = ingredient;
  }

  onDeleteIngredient(ingredient: Ingredient) {
    console.log(ingredient.id);
  }
}
