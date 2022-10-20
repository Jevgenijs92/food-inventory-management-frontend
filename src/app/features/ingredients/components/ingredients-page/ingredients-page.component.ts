import { Component } from '@angular/core';
import { IngredientsService } from '@fim/features/ingredients/core/facades/ingredients.service';
import { Ingredient } from '@fim/features/ingredients/core/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { IngredientsFormComponent } from '../ingredients-form';
import { take, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppTranslateService } from '@fim/core/services/app-translate.service';

@Component({
  selector: 'fim-ingredients-page',
  templateUrl: './ingredients-page.component.html',
})
export class IngredientsPageComponent {
  constructor(
    protected ingredientsService: IngredientsService,
    protected dialog: MatDialog,
    protected matSnackBar: MatSnackBar,
    protected translateService: AppTranslateService
  ) {
    this.loadIngredients();
  }

  ingredientsSource: BehaviorSubject<Ingredient[]> = new BehaviorSubject<
    Ingredient[]
  >([]);
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
    const close = 'ingredients.form.close';
    this.translateService
      .translate([message, close])
      .pipe(take(1))
      .subscribe((translations) =>
        this.matSnackBar.open(translations[message], translations[close], {
          duration: 5000,
        })
      );
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
