import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LoadingService } from './core';
import { AppTranslateService } from './core/services/app-translate.service';
import { MockProvider, MockRender } from 'ng-mocks';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { MatProgressBarModule } from '@angular/material/progress-bar';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  const init = jest.fn(() => {});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatProgressBarModule],
      declarations: [AppComponent],
      providers: [
        MockProvider(LoadingService, {
          isLoading$: of(false),
        }),
        MockProvider(AppTranslateService, {
          init,
        }),
      ],
    }).compileComponents();

    fixture = MockRender(AppComponent);
    component = fixture.componentInstance;
  });

  test('should create the app', () => {
    expect(component).toBeTruthy();
  });

  test(`should have as title 'Food inventory management'`, () => {
    expect(component.title).toEqual('Food inventory management');
  });

  test('should call init inside translate service', () => {
    init.mockClear();
    MockRender(AppComponent);
    expect(init).toHaveBeenCalledTimes(1);
  });

  test('isLoading$ should get value from loading service property isLoading$', () => {
    expect(component.isLoading$.pipe(first()).toPromise()).resolves.toEqual(
      false
    );
  });

  test('when isLoading$ is true, component should render progress bar', () => {
    component.isLoading$ = of(true);
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.fim-progress-bar')
    ).not.toBeNull();
  });
});
