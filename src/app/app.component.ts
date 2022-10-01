import { Component } from '@angular/core';
import { LoadingService } from '@fim/core';
import { AppTranslateService } from '@fim/core/services/app-translate.service';

export const LANGUAGES = ['en', 'ru', 'lv'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(
    protected loadingService: LoadingService,
    protected translate: AppTranslateService
  ) {
    this.translate.addLangs(LANGUAGES);
  }

  get isLoading$() {
    return this.loadingService.isLoading$;
  }

  title = 'Food inventory management';
}
