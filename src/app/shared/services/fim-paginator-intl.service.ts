import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateParser, TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

enum PaginatorIntl {
  FIRST_PAGE_LABEL = 'paginator.firstPageLabel',
  ITEMS_PER_PAGE_LABEL = 'paginator.itemsPerPageLabel',
  LAST_PAGE_LABEL = 'paginator.lastPageLabel',
  NEXT_PAGE_LABEL = 'paginator.nextPageLabel',
  PREVIOUS_PAGE_LABEL = 'paginator.previousPageLabel',
  RANGE_LABEL = 'paginator.rangeLabel',
}

@Injectable({
  providedIn: 'root',
})
export class FimPaginatorIntl extends MatPaginatorIntl {
  constructor(
    protected translate: TranslateService,
    protected translateParser: TranslateParser
  ) {
    super();
    this.getTranslations();
  }

  rangeLabel: string = '';

  getTranslations() {
    this.translate
      .get([
        PaginatorIntl.FIRST_PAGE_LABEL,
        PaginatorIntl.ITEMS_PER_PAGE_LABEL,
        PaginatorIntl.LAST_PAGE_LABEL,
        PaginatorIntl.NEXT_PAGE_LABEL,
        PaginatorIntl.PREVIOUS_PAGE_LABEL,
        PaginatorIntl.RANGE_LABEL,
      ])
      .subscribe((translations) => {
        this.firstPageLabel = translations[PaginatorIntl.FIRST_PAGE_LABEL];
        this.itemsPerPageLabel =
          translations[PaginatorIntl.ITEMS_PER_PAGE_LABEL];
        this.lastPageLabel = translations[PaginatorIntl.LAST_PAGE_LABEL];
        this.nextPageLabel = translations[PaginatorIntl.NEXT_PAGE_LABEL];
        this.previousPageLabel =
          translations[PaginatorIntl.PREVIOUS_PAGE_LABEL];
        this.rangeLabel = translations[PaginatorIntl.RANGE_LABEL];
        this.changes.next();
      });
  }

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return (
      this.translateParser.interpolate(this.rangeLabel, {
        start: startIndex,
        end: endIndex,
        length,
      }) ?? ''
    );
  };
}
