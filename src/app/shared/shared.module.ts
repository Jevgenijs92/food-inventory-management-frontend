import { NgModule } from '@angular/core';
import { FimPaginatorIntl } from '@fim/shared/services/fim-paginator-intl.service';
import { MatPaginatorIntl } from '@angular/material/paginator';

@NgModule({
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: FimPaginatorIntl,
    },
  ],
})
export class SharedModule {}
