import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'fim-homepage',
  templateUrl: './homepage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent {}
