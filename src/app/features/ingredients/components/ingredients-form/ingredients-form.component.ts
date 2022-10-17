import { Component } from '@angular/core';
import {
  UnitOfMeasurement,
  UnitOfMeasurementMapping,
} from '@fim/features/ingredients/core/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppTranslateService } from '@fim/core/services/app-translate.service';
import { IngredientsService } from '@fim/features/ingredients/core/facades/ingredients.service';
import { calculatePricePerUnit } from '@fim/shared/utils';

@Component({
  selector: 'fim-ingredients-form',
  templateUrl: './ingredients-form.component.html',
})
export class IngredientsFormComponent {
  unitsOfMeasurement = Object.values(UnitOfMeasurement);
  form: FormGroup;
  pricePerUnit$: Observable<string>;

  submittedSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  submitted$: Observable<boolean> = this.submittedSource.asObservable();

  errorsSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  errors$: Observable<boolean> = this.errorsSource.asObservable();

  constructor(
    protected formBuilder: FormBuilder,
    protected dialogRef: MatDialogRef<IngredientsFormComponent>,
    protected translateService: AppTranslateService,
    protected ingredientsService: IngredientsService
  ) {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      quantityPerPackaging: [0, [Validators.required, Validators.min(0)]],
      unitOfMeasurement: [null, Validators.required],
      pricePerPackaging: [0, [Validators.required, Validators.min(0)]],
    });
    this.pricePerUnit$ = combineLatest([
      this.form.get('quantityPerPackaging')!.valueChanges,
      this.form.get('pricePerPackaging')!.valueChanges,
      this.form.get('unitOfMeasurement')!.valueChanges,
    ]).pipe(
      map(
        ([quantityPerPackaging, pricePerPackaging, unitOfMeasurement]: [
          number,
          number,
          UnitOfMeasurement
        ]): [number, UnitOfMeasurement] => [
          calculatePricePerUnit(quantityPerPackaging, pricePerPackaging),
          unitOfMeasurement,
        ]
      ),
      switchMap(([price, unit]: [number, UnitOfMeasurement]) =>
        this.formatPricePerUnit(price, unit)
      )
    );
  }

  onCreate() {
    if (this.form.valid) {
      this.submittedSource.next(true);
      this.ingredientsService.createIngredient(this.form.value).subscribe(
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
