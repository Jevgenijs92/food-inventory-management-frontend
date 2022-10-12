import { Component } from '@angular/core';
import { IngredientsService } from '@fim/features/ingredients/core/facades/ingredients.service';
import { Ingredient } from '@fim/features/ingredients/core/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'fim-ingredients-page',
  templateUrl: './ingredients-page.component.html',
})
export class IngredientsPageComponent {
  constructor(protected ingredientsService: IngredientsService) {}

  ingredients$: Observable<Ingredient[]> =
    this.ingredientsService.getIngredients();
}
