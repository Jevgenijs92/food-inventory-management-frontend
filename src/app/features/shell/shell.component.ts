import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const HOMEPAGE_ICONS: { [iconName: string]: string } = {
  ingredients: 'ingredients.svg',
  'no-image': 'no-image.svg',
  products: 'products.svg',
  orders: 'orders.svg',
};

const ICONS_PATH = '../assets/icons/';

@Component({
  selector: 'fim-shell',
  templateUrl: './shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  constructor(
    protected matIconRegistry: MatIconRegistry,
    protected domSanitizer: DomSanitizer
  ) {
    this.addSvgIcons(HOMEPAGE_ICONS);
  }

  protected addSvgIcons(icons: { [iconName: string]: string }) {
    Object.keys(icons).forEach((iconName) =>
      this.matIconRegistry.addSvgIcon(
        iconName,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          ICONS_PATH + icons[iconName]
        )
      )
    );
  }
}
