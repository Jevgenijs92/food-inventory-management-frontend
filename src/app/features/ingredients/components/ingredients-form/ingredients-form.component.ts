import { AfterViewInit, Component } from '@angular/core';
import {
  Ingredient,
  UnitOfMeasurement,
  UnitOfMeasurementMapping,
} from '@fim/features/ingredients/core/models';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { AppTranslateService } from '@fim/core/services/app-translate.service';
import { IngredientsService } from '@fim/features/ingredients/core/facades/ingredients.service';
import { calculatePricePerUnit } from '@fim/shared/utils';

@Component({
  selector: 'fim-ingredients-form',
  templateUrl: './ingredients-form.component.html',
})
export class IngredientsFormComponent implements AfterViewInit {
  unitsOfMeasurement = Object.values(UnitOfMeasurement);
  form: FormGroup;
  ingredient: Ingredient | undefined;

  pricePerUnit$: Observable<string>;

  submittedSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  submitted$: Observable<boolean> = this.submittedSource.asObservable();

  errorsSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  errors$: Observable<boolean> = this.errorsSource.asObservable();

  constructor(
    protected formBuilder: NonNullableFormBuilder,
    protected dialogRef: MatDialogRef<IngredientsFormComponent>,
    protected translateService: AppTranslateService,
    protected ingredientsService: IngredientsService
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
      this.submittedSource.next(true);
      let ingredient$: Observable<Ingredient>;
      if (this.ingredient) {
        ingredient$ = this.ingredientsService.updateIngredient(
          this.ingredient.id,
          this.form.value
        );
      } else {
        ingredient$ = this.ingredientsService.createIngredient(this.form.value);
      }
      ingredient$.subscribe(
        () => this.errorsSource.next(false),
        () => this.errorsSource.next(true)
      );
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
