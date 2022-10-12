import { Component } from '@angular/core';
import { UnitOfMeasurement } from '@fim/features/ingredients/core/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'fim-ingredients-form',
  templateUrl: './ingredients-form.component.html',
})
export class IngredientsFormComponent {
  uom = Object.values(UnitOfMeasurement);
  form: FormGroup;

  constructor(protected formBuilder: FormBuilder,
              protected dialogRef: MatDialogRef<IngredientsFormComponent>) {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      quantityPerPackaging: [0, [Validators.required, Validators.min(0)]],
      unitOfMeasurement: [null, Validators.required],
      pricePerPackaging: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onCreate() {
    console.log(this.form.value);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
