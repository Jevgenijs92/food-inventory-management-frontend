import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableActionsComponent } from './table-actions/table-actions.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [TableActionsComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [TableActionsComponent],
})
export class SharedComponentsModule {}
