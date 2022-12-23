import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IngredientsService } from '@fim/features/ingredients/core/facades/ingredients.service';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as IngredientsActions from '../actions/ingredients.actions';
import { of } from 'rxjs';
import { SnackBarService } from '@fim/features/snack-bar/services/snack-bar.service';
import { Ingredient } from '@fim/features/ingredients/core/models';

@Injectable()
export class IngredientsEffects {
  constructor(
    private actions$: Actions,
    protected ingredientsService: IngredientsService,
    protected snackBarService: SnackBarService
  ) {}

  loadIngredients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IngredientsActions.LOAD_INGREDIENTS),
      switchMap(() =>
        this.ingredientsService.getIngredients().pipe(
          map((ingredients) =>
            IngredientsActions.loadIngredientsSuccess({ ingredients })
          ),
          catchError((error) =>
            of(IngredientsActions.loadIngredientsFailure({ error }))
          )
        )
      )
    )
  );

  addIngredient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IngredientsActions.ADD_INGREDIENT),
      mergeMap((payload) =>
        this.ingredientsService.createIngredient(payload).pipe(
          map((ingredient) =>
            IngredientsActions.addIngredientSuccess(ingredient)
          ),
          catchError((error) =>
            of(IngredientsActions.addIngredientFailure({ error }))
          )
        )
      )
    )
  );

  addIngredientSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(IngredientsActions.ADD_INGREDIENT_SUCCESS),
        tap(() =>
          this.snackBarService.openSnackBar(
            'ingredients.form.action.add.success'
          )
        )
      ),
    { dispatch: false }
  );

  addIngredientFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(IngredientsActions.ADD_INGREDIENT_FAILURE),
        tap(() =>
          this.snackBarService.openSnackBar('ingredients.form.action.add.error')
        )
      ),
    { dispatch: false }
  );

  updateIngredient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IngredientsActions.UPDATE_INGREDIENT),
      mergeMap((payload: { id: string; ingredient: Ingredient }) => {
        return this.ingredientsService
          .updateIngredient(payload.id, payload.ingredient)
          .pipe(
            map((ingredient) =>
              IngredientsActions.updateIngredientSuccess(ingredient)
            ),
            catchError((error) =>
              of(IngredientsActions.updateIngredientFailure(error))
            )
          );
      })
    )
  );

  updateIngredientSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(IngredientsActions.UPDATE_INGREDIENT_SUCCESS),
        tap(() =>
          this.snackBarService.openSnackBar(
            'ingredients.form.action.update.success'
          )
        )
      ),
    { dispatch: false }
  );

  updateIngredientFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(IngredientsActions.UPDATE_INGREDIENT_FAILURE),
        tap(() =>
          this.snackBarService.openSnackBar(
            'ingredients.form.action.update.error'
          )
        )
      ),
    { dispatch: false }
  );

  deleteIngredient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IngredientsActions.DELETE_INGREDIENT),
      mergeMap((payload: { id: string }) =>
        this.ingredientsService.deleteIngredient(payload.id).pipe(
          map(() =>
            IngredientsActions.deleteIngredientSuccess({ id: payload.id })
          ),
          catchError((error) =>
            of(IngredientsActions.deleteIngredientFailure(error))
          )
        )
      )
    )
  );

  deleteIngredientSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(IngredientsActions.DELETE_INGREDIENT_SUCCESS),
        tap(() =>
          this.snackBarService.openSnackBar(
            'ingredients.form.action.delete.success'
          )
        )
      ),
    { dispatch: false }
  );

  deleteIngredientFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(IngredientsActions.DELETE_INGREDIENT_FAILURE),
        tap(() =>
          this.snackBarService.openSnackBar(
            'ingredients.form.action.delete.error'
          )
        )
      ),
    { dispatch: false }
  );
}
