import { Component } from '@angular/core';
import { IngredientsService } from '@fim/features/ingredients/core/facades/ingredients.service';
import { Ingredient } from '@fim/features/ingredients/core/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { IngredientsFormComponent } from '../ingredients-form';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'fim-ingredients-page',
  templateUrl: './ingredients-page.component.html',
})
export class IngredientsPageComponent {
  constructor(
    protected ingredientsService: IngredientsService,
    protected dialog: MatDialog
  ) {
    this.loadIngredients();
  }

  ingredientsSource: BehaviorSubject<Ingredient[]> = new BehaviorSubject<
    Ingredient[]
  >([]);
  ingredients$: Observable<Ingredient[]> =
    this.ingredientsSource.asObservable();

  onClickAddIngredient() {
    const dialogRef = this.dialog.open(IngredientsFormComponent);
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => this.loadIngredients());
  }

  loadIngredients() {
    this.ingredientsService
      .getIngredients()
      .pipe(
        take(1),
        tap((ingredients) => this.ingredientsSource.next(ingredients))
      )
      .subscribe();
  }
}
