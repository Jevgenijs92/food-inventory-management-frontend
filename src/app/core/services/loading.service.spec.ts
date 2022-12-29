import { LoadingService } from '@fim/core';
import { first } from 'rxjs/operators';

describe('LoadingService', function () {
  let service: LoadingService;

  beforeEach(() => {
    service = new LoadingService();
  });

  test('isLoading$ should be initialized to false', () => {
    expect(service.isLoading$.pipe(first()).toPromise()).resolves.toBe(false);
  });

  test('setLoading should change loading state', () => {
    service.setLoading(true);
    expect(service.isLoading$.pipe(first()).toPromise()).resolves.toBeTruthy();
  });
});
