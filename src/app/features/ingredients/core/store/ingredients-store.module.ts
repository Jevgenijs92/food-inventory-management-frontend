import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import {
  ingredientsReducer
} from '@fim/features/ingredients/core/store/reducers/ingredients.reducer';
import { EffectsModule } from '@ngrx/effects';
import {
  IngredientsEffects
} from '@fim/features/ingredients/core/store/effects/ingredients.effects';

export const INGREDIENTS_FEATURE = 'ingredients';

@NgModule({
  imports: [
    StoreModule.forFeature(INGREDIENTS_FEATURE, ingredientsReducer),
    EffectsModule.forFeature([IngredientsEffects])
  ]
})
export class IngredientsStoreModule {}
