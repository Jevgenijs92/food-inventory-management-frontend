import { Component } from '@angular/core';
import { LoadingService } from '@fim/core';
import { AppTranslateService } from '@fim/core/services/app-translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(
    protected loadingService: LoadingService,
    protected translate: AppTranslateService
  ) {
    this.translate.init();
  }

  isLoading$ = this.loadingService.isLoading$;

  title = 'Food inventory management';
}
