import { Component, OnDestroy } from '@angular/core';
import { Ingredient } from '@fim/features/ingredients/core/models';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IngredientsFormComponent } from '../ingredients-form';
import { take } from 'rxjs/operators';
import { IngredientsFacade } from '@fim/features/ingredients/core/ingredients.facade';
import { ErrorModel } from '@fim/shared/models';

@Component({
  selector: 'fim-ingredients-page',
  templateUrl: './ingredients-page.component.html',
})
export class IngredientsPageComponent implements OnDestroy {
  constructor(
    protected dialog: MatDialog,
    protected ingredientsFacade: IngredientsFacade
  ) {
    this.ingredientsFacade.loadIngredients();
  }

  dialogRef: MatDialogRef<IngredientsFormComponent> | null = null;

  ingredients$: Observable<ReadonlyArray<Ingredient> | null> =
    this.ingredientsFacade.ingredients$;

  isLoadingIngredients$: Observable<boolean> =
    this.ingredientsFacade.isLoadingIngredients$;

  loadIngredientsError$: Observable<ErrorModel> =
    this.ingredientsFacade.loadingIngredientsError$;

  onClickAddIngredient() {
    this.openIngredientsFormDialog();
  }

  onClickUpdateIngredient(ingredient: Ingredient) {
    this.openIngredientsFormDialog(ingredient);
  }

  onClickDeleteIngredient(ingredient: Ingredient) {
    this.ingredientsFacade.deleteIngredient(ingredient.id);
  }

  openIngredientsFormDialog(ingredient?: Ingredient) {
    this.dialogRef = this.dialog.open(IngredientsFormComponent);
    if (ingredient) {
      this.dialogRef.componentInstance.ingredient = ingredient;
    }
    this.dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => {
        this.dialogRef = null;
      });
  }

  ngOnDestroy(): void {
    this.dialogRef?.close();
  }
}
