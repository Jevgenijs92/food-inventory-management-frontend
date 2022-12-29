import { TestBed } from '@angular/core/testing';
import { LoadingService } from '@fim/core';
import { LoadingInterceptor } from '@fim/core/interceptors/loading.interceptor';
import { environment } from '../../../environments/environment';
import { HttpEvent, HttpRequest } from '@angular/common/http';
import { EMPTY, Observable, Subject } from 'rxjs';
import { MockService } from 'ng-mocks';

describe('LoadingInterceptor', function () {
  let interceptor: LoadingInterceptor;
  let loadingService: LoadingService;
  const request = new HttpRequest('GET', environment.baseUrl);

  beforeEach(() => {
    jest.clearAllMocks();

    loadingService = MockService(LoadingService);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: LoadingService,
          useValue: loadingService,
        },
        LoadingInterceptor,
      ],
    });
    interceptor = TestBed.inject(LoadingInterceptor);
  });

  test('should set loading to true when intercept is called and matches url condition', (done) => {
    const spy = jest.spyOn(loadingService, 'setLoading');
    const request = new HttpRequest('GET', environment.baseUrl);
    interceptor.intercept(request, {
      handle(_req: HttpRequest<any>): Observable<HttpEvent<any>> {
        return EMPTY;
      },
    });
    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(true);
      done();
    });
  }, 200);

  test('should set loading to false when handle finalized', (done) => {
    const spy = jest.spyOn(loadingService, 'setLoading');

    const subject = new Subject<HttpEvent<any>>();
    interceptor
      .intercept(request, {
        handle(_req: HttpRequest<any>): Observable<HttpEvent<any>> {
          return subject.asObservable();
        },
      })
      .subscribe()
      .unsubscribe();

    subject.complete();

    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith(false);
      expect(spy).toHaveBeenCalledWith(true);
      done();
    });
  }, 200);
});
