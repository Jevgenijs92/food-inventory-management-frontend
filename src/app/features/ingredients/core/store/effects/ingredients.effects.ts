import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  IngredientsService
} from '@fim/features/ingredients/core/facades/ingredients.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as IngredientsActions from '../actions/ingredients.actions';
import { of } from 'rxjs';

@Injectable()
export class IngredientsEffects {
  constructor(
    private actions$: Actions,
    protected ingredientsService: IngredientsService
  ) {}

  loadIngredients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IngredientsActions.LOAD_INGREDIENTS),
      switchMap(() =>
        this.ingredientsService
          .getIngredients()
          .pipe(
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
}
