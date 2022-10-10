import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Ingredient } from '../models';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  constructor(protected http: HttpClient) {}

  protected ingredientsUrl = `${environment.baseUrl}/ingredients`;

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.ingredientsUrl);
  }
}
