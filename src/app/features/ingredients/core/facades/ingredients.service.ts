import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Ingredient, UnitOfMeasurementMapping } from '../models';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  constructor(protected http: HttpClient) {}

  protected ingredientsUrl = `${environment.baseUrl}/ingredients`;

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.ingredientsUrl);
  }

  createIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(
      this.ingredientsUrl,
      this.serializeIngredient(ingredient)
    );
  }

  updateIngredient(id: string, ingredient: Ingredient): Observable<Ingredient> {
    return this.http.patch<Ingredient>(
      `${this.ingredientsUrl}/${id}`,
      this.serializeIngredient(ingredient)
    )
  }

  serializeIngredient(ingredient: Ingredient): Ingredient {
    const { unit, multiplier } =
      UnitOfMeasurementMapping[ingredient.unitOfMeasurement];
    return {
      ...ingredient,
      quantityPerPackaging: ingredient.quantityPerPackaging / multiplier,
      unitOfMeasurement: unit,
    };
  }
}
