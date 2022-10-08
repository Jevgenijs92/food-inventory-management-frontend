import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'fim-homepage-card',
  templateUrl: './homepage-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageCardComponent {
  @Input()
  svgIcon: string = 'no-image';

  @Input()
  iconColor: string = '';

  @Input()
  title: string = '';

  @Input()
  route: string = '';
}
