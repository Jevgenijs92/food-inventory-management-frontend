import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoadingSource = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSource.asObservable();

  setLoading(isLoading: boolean): void {
    this.isLoadingSource.next(isLoading);
  }
}
