import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from '../models';
import {
  loadingIngredients,
  loadingIngredientsFailure,
  selectIngredients,
} from '../store/ingredients.selectors';
import * as IngredientsActions from '../store/ingredients.actions';
import { Injectable } from '@angular/core';
import { ErrorModel } from '@fim/shared/models';

@Injectable({
  providedIn: 'root',
})
export class IngredientsFacade {
  constructor(private store: Store) {}

  ingredients$: Observable<ReadonlyArray<Ingredient> | null> =
    this.store.select(selectIngredients);

  isLoadingIngredients$: Observable<boolean> =
    this.store.select(loadingIngredients);

  loadingIngredientsError$: Observable<ErrorModel> = this.store.select(
    loadingIngredientsFailure
  );

  loadIngredients() {
    this.store.dispatch(IngredientsActions.loadIngredients());
  }

  addIngredient(ingredient: Partial<Ingredient>) {
    this.store.dispatch(IngredientsActions.addIngredient(ingredient));
  }

  updateIngredient(id: string, ingredient: Ingredient) {
    this.store.dispatch(
      IngredientsActions.updateIngredient({ id, ingredient })
    );
  }

  deleteIngredient(id: string) {
    this.store.dispatch(IngredientsActions.deleteIngredient({ id }));
  }
}
