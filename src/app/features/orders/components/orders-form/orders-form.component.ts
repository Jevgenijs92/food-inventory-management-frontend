import { AfterViewInit, Component } from '@angular/core';
import {
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { Product } from '@fim/features/products/core/models';
import { Order } from '../../core/models';
import { OrdersFacade } from '@fim/features/orders/core/facades/orders.facade';
import { ProductsFacade } from '@fim/features/products/core/facades/products.facade';
import { map } from 'rxjs/operators';

@Component({
  selector: 'fim-orders-form',
  templateUrl: './orders-form.component.html',
})
export class OrdersFormComponent implements AfterViewInit {
  form: FormGroup;
  order: Order | undefined;

  products$: Observable<ReadonlyArray<Product> | null> =
    this.productsFacade.products$.pipe(
      map((products) =>
        products
          ? [...products].sort((a, b) => a.name?.localeCompare(b.name))
          : products
      )
    );

  constructor(
    protected formBuilder: NonNullableFormBuilder,
    protected dialogRef: MatDialogRef<OrdersFormComponent>,
    protected ordersFacade: OrdersFacade,
    protected productsFacade: ProductsFacade
  ) {
    this.form = this.formBuilder.group({
      deliveryDate: [null, Validators.required],
      documentNumber: [null],
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
        this.form.get('documentNumber')?.patchValue(this.order.documentNumber);
        this.order.products.forEach((product) => {
          this.productsArray.push(
            this.getProductGroup(
              product.id,
              product.name,
              product.deliveryQuantity,
              product.sellPrice
            )
          );
        });
      } else {
        this.productsArray.push(this.getProductGroup());
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.order) {
        this.ordersFacade.updateOrder(this.order.id, this.form.value);
      } else {
        this.ordersFacade.addOrder(this.form.value);
      }
      this.onClose();
    }
  }

  onClickDeleteOrder(orderId: string) {
    this.ordersFacade.deleteOrder(orderId);
    this.onClose();
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
    productName: string | null = null,
    deliveryQuantity: number = 0,
    sellPrice: number = 0
  ): FormGroup {
    return this.formBuilder.group({
      id: [productId, Validators.required],
      name: [{ value: productName, disabled: true }],
      deliveryQuantity: [
        deliveryQuantity,
        [Validators.required, Validators.min(0)],
      ],
      sellPrice: [sellPrice, [Validators.required, Validators.min(0)]],
    });
  }
}
