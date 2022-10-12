import { Component } from '@angular/core';
import { IngredientsService } from '@fim/features/ingredients/core/facades/ingredients.service';
import { Ingredient } from '@fim/features/ingredients/core/models';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { IngredientsFormComponent } from '../ingredients-form';

@Component({
  selector: 'fim-ingredients-page',
  templateUrl: './ingredients-page.component.html',
})
export class IngredientsPageComponent {
  constructor(
    protected ingredientsService: IngredientsService,
    protected dialog: MatDialog
  ) {}

  ingredients$: Observable<Ingredient[]> =
    this.ingredientsService.getIngredients();

  onClickAddIngredient() {
    const dialogRef = this.dialog.open(IngredientsFormComponent);
    dialogRef.afterClosed().subscribe(console.log);
  }
}
