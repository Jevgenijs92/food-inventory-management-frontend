import { AfterViewInit, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import {
  ProductsService
} from '@fim/features/products/core/facades/products.service';
import { Product } from '@fim/features/products/core/models';
import { tap } from 'rxjs/operators';
import { Order } from '../../core/models';
import {
  OrdersService
} from '../../core/facades/orders.service';

@Component({
  selector: 'fim-orders-form',
  templateUrl: './orders-form.component.html',
})
export class OrdersFormComponent implements AfterViewInit{
  form: FormGroup;
  order: Order | undefined;

  submittedSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  submitted$: Observable<boolean> = this.submittedSource.asObservable();

  errorsSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  errors$: Observable<boolean> = this.errorsSource.asObservable();

  products$: Observable<Product[]> = this.productsService
    .getProducts()
    .pipe(tap((products) => (this.products = products)));
  products: Product[] = [];

  constructor(
    protected formBuilder: FormBuilder,
    protected dialogRef: MatDialogRef<OrdersFormComponent>,
    protected productsService: ProductsService,
    protected ordersService: OrdersService
  ) {
    this.form = this.formBuilder.group({
      deliveryDate: [null, Validators.required],
      products: this.formBuilder.array([]),
    });
  }

  get productsArray(): FormArray {
    return this.form.get('products') as FormArray;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.order) {
        this.form.get('deliveryDate')?.patchValue(this.order.deliveryDate);
        this.order.products.forEach((product) => {
          this.productsArray.push(
            this.getProductGroup(product.id, product.deliveryQuantity)
          );
        });
      } else {
        this.productsArray.push(this.getProductGroup());
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submittedSource.next(true);
      let order$: Observable<Order>;
      if (this.order) {
        order$ = this.ordersService.updateOrder(this.order.id, this.form.value);
      } else {
        order$ = this.ordersService.createOrder(this.form.value);
      }
      order$.subscribe(
        () => this.errorsSource.next(false),
        () => this.errorsSource.next(true)
      );
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onRemoveProduct(i: number) {
    this.productsArray.removeAt(i);
  }

  onAddProduct() {
    this.productsArray.push(this.getProductGroup());
  }

  private getProductGroup(
    productId: string | null = null,
    deliveryQuantity: number = 0
  ): FormGroup {
    return this.formBuilder.group({
      id: [productId, Validators.required],
      deliveryQuantity: [
        deliveryQuantity,
        [Validators.required, Validators.min(0)],
      ],
    });
  }
}
