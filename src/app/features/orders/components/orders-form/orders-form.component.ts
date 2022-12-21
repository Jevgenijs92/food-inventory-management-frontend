import { AfterViewInit, Component, Input } from '@angular/core';
import {
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { Product } from '@fim/features/products/core/models';
import { Order } from '../../core/models';
import { OrdersService } from '../../core/facades/orders.service';
import { take } from 'rxjs/operators';
import { SnackBarService } from '@fim/features/snack-bar/services/snack-bar.service';

@Component({
  selector: 'fim-orders-form',
  templateUrl: './orders-form.component.html',
})
export class OrdersFormComponent implements AfterViewInit {
  form: FormGroup;
  order: Order | undefined;

  submittedSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  submitted$: Observable<boolean> = this.submittedSource.asObservable();

  errorsSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  errors$: Observable<boolean> = this.errorsSource.asObservable();

  @Input()
  products: Product[] = [];

  constructor(
    protected formBuilder: NonNullableFormBuilder,
    protected dialogRef: MatDialogRef<OrdersFormComponent>,
    protected ordersService: OrdersService,
    protected snackBarService: SnackBarService
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

  onClickDeleteOrder(orderId: string) {
    this.ordersService
      .deleteOrder(orderId)
      .pipe(take(1))
      .subscribe(
        () => {
          this.openSnackBar('orders.form.deleted');
          this.dialogRef.close();
        },
        (error) => {
          this.openSnackBar(error);
        }
      );
  }

  private openSnackBar(message: string) {
    this.snackBarService.openSnackBar(message);
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
