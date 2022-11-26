import { Injectable } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

@Injectable()
export class FimDateAdapter extends MomentDateAdapter {
  getFirstDayOfWeek(): number {
    return 1;
  }
}
