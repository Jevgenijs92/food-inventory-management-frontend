import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import {
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { combineLatest, Observable, Subject } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { Product } from '@fim/features/products/core/models';
import { Ingredient } from '@fim/features/ingredients/core/models';
import { debounceTime, map, shareReplay, takeUntil } from 'rxjs/operators';
import { ProductsFacade } from '@fim/features/products/core/facades/products.facade';
import { IngredientsFacade } from '@fim/features/ingredients/core/facades/ingredients.facade';

@Component({
  selector: 'fim-products-form',
  templateUrl: './products-form.component.html',
})
export class ProductsFormComponent implements AfterViewInit, OnDestroy {
  form: FormGroup;
  product: Product | undefined;

  ingredients$: Observable<ReadonlyArray<Ingredient> | null> =
    this.ingredientsFacade.ingredients$.pipe(
      map((ingredients) =>
        ingredients
          ? [...ingredients].sort((a, b) => a.name?.localeCompare(b.name))
          : null
      ),
      shareReplay({ bufferSize: 1, refCount: true })
    );

  endSubs$: Subject<void> = new Subject<void>();

  constructor(
    protected formBuilder: NonNullableFormBuilder,
    protected dialogRef: MatDialogRef<ProductsFormComponent>,
    protected productsFacade: ProductsFacade,
    protected ingredientsFacade: IngredientsFacade
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      ingredients: this.formBuilder.array([]),
      total: [{ value: 0, disabled: true }],
    });
    this.watchIngredientsArrayChange();
  }

  get ingredientsArray(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.product) {
        this.form.get('name')?.patchValue(this.product.name);
        this.product.ingredients.forEach((ingredient) => {
          this.ingredientsArray.push(
            this.getIngredientGroup(
              ingredient.ingredient.id,
              ingredient.quantity
            )
          );
        });
      } else {
        this.ingredientsArray.push(this.getIngredientGroup());
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.disable();
      if (this.product) {
        this.productsFacade.updateProduct(this.product.id, this.form.value);
      } else {
        this.productsFacade.addProduct(this.form.value);
      }
      this.onClose();
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onRemoveIngredient(i: number) {
    this.ingredientsArray.removeAt(i);
  }

  onAddIngredient() {
    this.ingredientsArray.push(this.getIngredientGroup());
  }

  private watchIngredientsArrayChange() {
    combineLatest([
      this.ingredientsArray.valueChanges.pipe(debounceTime(200)),
      this.ingredients$,
    ])
      .pipe(takeUntil(this.endSubs$))
      .subscribe(
        ([ingredientsForm, ingredients]: [
          { ingredient: string; quantity: number }[],
          ReadonlyArray<Ingredient> | null
        ]) => {
          this.updateFormPrices(ingredients, ingredientsForm);
        }
      );
  }

  private getIngredientGroup(
    ingredient: string | null = null,
    quantity: number = 0
  ): FormGroup {
    return this.formBuilder.group({
      ingredient: [ingredient, Validators.required],
      quantity: [quantity, [Validators.required, Validators.min(0)]],
      price: [{ value: 0, disabled: true }],
    });
  }

  private updateFormPrices(
    ingredients: ReadonlyArray<Ingredient> | null,
    ingredientsForm: { ingredient: string; quantity: number }[]
  ) {
    if (ingredients) {
      let total = 0;
      ingredientsForm.forEach((ingredientForm, index) => {
        const ingredient = ingredients.find(
          (value) => value.id === ingredientForm.ingredient
        );
        let price = 0;
        if (ingredient) {
          price = ingredient.pricePerUnit * ingredientForm.quantity ?? 0;
        }
        this.ingredientsArray.controls[index]
          .get('price')
          ?.patchValue(price.toFixed(2), { emitEvent: false });
        total += price;
      });
      this.form
        .get('total')
        ?.patchValue(total.toFixed(2), { emitEvent: false });
    }
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
}
