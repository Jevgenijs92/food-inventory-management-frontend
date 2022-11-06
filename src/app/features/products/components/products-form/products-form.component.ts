import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import {
  ProductsService
} from '@fim/features/products/core/facades/products.service';
import { Product } from '@fim/features/products/core/models';
import { Ingredient } from '@fim/features/ingredients/core/models';
import {
  IngredientsService
} from '@fim/features/ingredients/core/facades/ingredients.service';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'fim-products-form',
  templateUrl: './products-form.component.html',
})
export class ProductsFormComponent implements AfterViewInit, OnDestroy {
  form: FormGroup;
  product: Product | undefined;

  submittedSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  submitted$: Observable<boolean> = this.submittedSource.asObservable();

  errorsSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  errors$: Observable<boolean> = this.errorsSource.asObservable();

  ingredients$: Observable<Ingredient[]> = this.ingredientsService
    .getIngredients()
    .pipe(tap((ingredients) => (this.ingredients = ingredients)));
  ingredients: Ingredient[] = [];

  endSubs$: Subject<void> = new Subject<void>();

  constructor(
    protected formBuilder: FormBuilder,
    protected dialogRef: MatDialogRef<ProductsFormComponent>,
    protected productsService: ProductsService,
    protected ingredientsService: IngredientsService
  ) {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      ingredients: this.formBuilder.array([]),
      total: [{ value: 0, disabled: true }],
    });
    this.ingredientsArray.valueChanges
      .pipe(debounceTime(200), takeUntil(this.endSubs$))
      .subscribe((ingredients: { ingredient: string; quantity: number }[]) => {
        this.updateFormPrices(ingredients);
      });
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
      this.submittedSource.next(true);
      let product$: Observable<Product>;
      if (this.product) {
        product$ = this.productsService.updateProduct(
          this.product.id,
          this.form.value
        );
      } else {
        product$ = this.productsService.createProduct(this.form.value);
      }
      product$.subscribe(
        () => this.errorsSource.next(false),
        () => this.errorsSource.next(true)
      );
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
    ingredients: { ingredient: string; quantity: number }[]
  ) {
    let total = 0;
    ingredients.forEach((ingredientForm, index) => {
      const ingredient = this.ingredients.find(
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
    this.form.get('total')?.patchValue(total.toFixed(2), { emitEvent: false });
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
}