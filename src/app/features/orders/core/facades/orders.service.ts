import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Order, OrderForm } from '../models';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(protected http: HttpClient) {}

  protected ordersUrl = `${environment.baseUrl}/orders`;

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl);
  }

  createOrder(order: OrderForm): Observable<Order> {
    return this.http.post<Order>(this.ordersUrl, order);
  }

  updateOrder(id: string, order: OrderForm): Observable<Order> {
    return this.http.put<Order>(`${this.ordersUrl}/${id}`, order);
  }

  deleteOrder(id: string): Observable<Order> {
    return this.http.delete<Order>(`${this.ordersUrl}/${id}`);
  }
}
