import { Component, OnDestroy } from '@angular/core';
import { IngredientsService } from '@fim/features/ingredients/core/facades/ingredients.service';
import { Ingredient } from '@fim/features/ingredients/core/models';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IngredientsFormComponent } from '../ingredients-form';
import { take } from 'rxjs/operators';
import { SnackBarService } from '@fim/features/snack-bar/services/snack-bar.service';
import { IngredientsFacade } from '@fim/features/ingredients/core/ingredients.facade';

@Component({
  selector: 'fim-ingredients-page',
  templateUrl: './ingredients-page.component.html',
})
export class IngredientsPageComponent implements OnDestroy {
  constructor(
    protected ingredientsService: IngredientsService,
    protected dialog: MatDialog,
    protected snackBarService: SnackBarService,
    protected facade: IngredientsFacade
  ) {
    this.facade.loadIngredients();
  }

  dialogRef: MatDialogRef<IngredientsFormComponent> | null = null;

  ingredients$: Observable<ReadonlyArray<Ingredient> | null> =
    this.facade.ingredients$;

  isLoadingIngredients$: Observable<boolean> = this.facade.isLoadingIngredients$;

  loadIngredientsError$: Observable<{
    hasError: boolean;
    errorMessage: string;
  }> = this.facade.loadingIngredientsError$;

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
          this.facade.loadIngredients();
          this.openSnackBar('ingredients.form.deleted');
        },
        (error) => {
          this.openSnackBar(error);
        }
      );
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
        this.facade.loadIngredients();
      });
  }

  openSnackBar(message: string) {
    this.snackBarService.openSnackBar(message);
  }

  ngOnDestroy(): void {
    this.dialogRef?.close();
  }
}
