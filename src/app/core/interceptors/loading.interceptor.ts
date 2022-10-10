import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (!request.url.includes('/assets/')) {
      this.totalRequests++;
      this.loadingService.setLoading(true);

      return next.handle(request).pipe(
        finalize(() => {
          this.totalRequests--;
          if (this.totalRequests === 0) {
            this.loadingService.setLoading(false);
          }
        })
      );
    }
    return next.handle(request);
  }
}