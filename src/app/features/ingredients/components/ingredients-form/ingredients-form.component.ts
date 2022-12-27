import { AfterViewInit, Component } from '@angular/core';
import {
  Ingredient,
  UnitOfMeasurement,
  UnitOfMeasurementMapping,
} from '@fim/features/ingredients/core/models';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { AppTranslateService } from '@fim/core/services/app-translate.service';
import { calculatePricePerUnit } from '@fim/shared/utils';
import { IngredientsFacade } from '@fim/features/ingredients/core/facades/ingredients.facade';

@Component({
  selector: 'fim-ingredients-form',
  templateUrl: './ingredients-form.component.html',
})
export class IngredientsFormComponent implements AfterViewInit {
  unitsOfMeasurement = Object.values(UnitOfMeasurement);
  form: FormGroup;
  ingredient: Ingredient | undefined;

  pricePerUnit$: Observable<string>;

  constructor(
    protected formBuilder: NonNullableFormBuilder,
    protected dialogRef: MatDialogRef<IngredientsFormComponent>,
    protected translateService: AppTranslateService,
    protected ingredientsFacade: IngredientsFacade
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      quantityPerPackaging: [0, [Validators.required, Validators.min(0)]],
      unitOfMeasurement: ['', Validators.required],
      pricePerPackaging: [0, [Validators.required, Validators.min(0)]],
    });
    this.pricePerUnit$ = this.form.valueChanges.pipe(
      filter(({ unitOfMeasurement }) => Boolean(unitOfMeasurement)),
      map(
        ({
          quantityPerPackaging,
          pricePerPackaging,
          unitOfMeasurement,
        }): [number, UnitOfMeasurement] => [
          calculatePricePerUnit(quantityPerPackaging, pricePerPackaging),
          unitOfMeasurement,
        ]
      ),
      switchMap(([price, unit]: [number, UnitOfMeasurement]) =>
        this.formatPricePerUnit(price, unit)
      )
    );
  }

  ngAfterViewInit(): void {
    if (this.ingredient) {
      setTimeout(() =>
        this.form.patchValue({
          ...this.ingredient,
        })
      );
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.disable();
      if (this.ingredient) {
        this.ingredientsFacade.updateIngredient(
          this.ingredient.id,
          this.form.value
        );
      } else {
        this.ingredientsFacade.addIngredient(this.form.value);
      }
      this.onClose();
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  private formatPricePerUnit(
    pricePerUnit: number,
    uom: UnitOfMeasurement
  ): Observable<string> {
    const { unit, multiplier } = UnitOfMeasurementMapping[uom];
    return this.translateService
      .translate(`unitOfMeasurement.${unit}`)
      .pipe(
        map(
          (localizedUnit) =>
            `${(pricePerUnit * multiplier).toFixed(2)} / ${localizedUnit}`
        )
      );
  }
}
