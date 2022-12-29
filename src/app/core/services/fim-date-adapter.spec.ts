import { TestBed } from '@angular/core/testing';
import { FimDateAdapter } from '@fim/core/services/fim-date-adapter';

describe('FimDateAdapter', () => {
  let service: FimDateAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FimDateAdapter],
    });
    service = TestBed.inject(FimDateAdapter);
  });

  test('should return 1 when getFirstDayOfWeek is called', () => {
    expect(service.getFirstDayOfWeek()).toBe(1);
  });
});
