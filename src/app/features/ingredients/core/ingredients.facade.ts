import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from '@fim/features/ingredients/core/models';
import {
  loadingIngredients,
  loadingIngredientsFailure,
  selectIngredients,
} from '@fim/features/ingredients/core/store/selectors/ingredients.selectors';
import * as IngredientsActions from './store/actions/ingredients.actions';
import { IngredientsService } from '@fim/features/ingredients/core/facades/ingredients.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IngredientsFacade {
  constructor(
    private store: Store,
    protected ingredientsService: IngredientsService
  ) {}

  ingredients$: Observable<ReadonlyArray<Ingredient> | null> =
    this.store.select(selectIngredients);

  isLoadingIngredients$: Observable<boolean> =
    this.store.select(loadingIngredients);

  loadingIngredientsError$: Observable<{
    hasError: boolean;
    errorMessage: string;
  }> = this.store.select(loadingIngredientsFailure);

  loadIngredients() {
    this.store.dispatch(IngredientsActions.loadIngredients());
  }
}