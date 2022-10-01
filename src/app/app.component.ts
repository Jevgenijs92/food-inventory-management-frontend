import { Component } from '@angular/core';
import { LoadingService } from '@fim/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(protected loadingService: LoadingService) {}

  get isLoading$() {
    return this.loadingService.isLoading$;
  }

  title = 'Food inventory management';
}
