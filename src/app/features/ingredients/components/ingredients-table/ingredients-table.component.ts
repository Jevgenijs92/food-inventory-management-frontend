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

@Component({
  selector: 'fim-ingredients-table',
  templateUrl: './ingredients-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsTableComponent {
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
}
