import { Component } from '@angular/core';
import {
  IngredientsService
} from '@fim/features/ingredients/core/facades/ingredients.service';
import { Ingredient } from '@fim/features/ingredients/core/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { IngredientsFormComponent } from '../ingredients-form';
import { take, tap } from 'rxjs/operators';
import {
  SnackBarService
} from '@fim/features/snack-bar/services/snack-bar.service';

@Component({
  selector: 'fim-ingredients-page',
  templateUrl: './ingredients-page.component.html',
})
export class IngredientsPageComponent {
  constructor(
    protected ingredientsService: IngredientsService,
    protected dialog: MatDialog,
    protected snackBarService: SnackBarService
  ) {
    this.loadIngredients();
  }

  ingredientsSource: BehaviorSubject<Ingredient[]> = new BehaviorSubject<Ingredient[]>(
    []);
  ingredients$: Observable<Ingredient[]> =
    this.ingredientsSource.asObservable();

  onClickAddIngredient() {
    this.openIngredientsFormDialog();
  }

  onClickUpdateIngredient(ingredient: Ingredient) {
    this.openIngredientsFormDialog(ingredient);
  }

  onClickDeleteIngredient(ingredient: Ingredient) {
    this.ingredientsService
      .deleteIngredient(ingredient.id)
      .pipe(take(1))
      .subscribe(
        () => {
          this.loadIngredients();
          this.openSnackBar('ingredients.form.deleted');
        },
        (error) => {
          this.openSnackBar(error);
        }
      );
  }

  openIngredientsFormDialog(ingredient?: Ingredient) {
    const dialogRef = this.dialog.open(IngredientsFormComponent);
    if (ingredient) {
      dialogRef.componentInstance.ingredient = ingredient;
    }
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => this.loadIngredients());
  }

  openSnackBar(message: string) {
    this.snackBarService.openSnackBar(message);
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
