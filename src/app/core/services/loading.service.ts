import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSource = new BehaviorSubject<boolean>(false);

  get isLoading$(): Observable<boolean> {
    return this.isLoadingSource.asObservable();
  }

  set isLoading(isLoading: boolean) {
    this.isLoadingSource.next(isLoading);
  }
}