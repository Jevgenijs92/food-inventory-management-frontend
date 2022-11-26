import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { AppTranslateService } from '@fim/core/services/app-translate.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(
    protected translateService: AppTranslateService,
    protected matSnackBar: MatSnackBar
  ) {}

  openSnackBar(message: string) {
    const close = 'snackBar.close';
    this.translateService
      .translate([message, close])
      .pipe(take(1))
      .subscribe((translations) =>
        this.matSnackBar.open(translations[message], translations[close], {
          duration: 5000,
        })
      );
  }
}