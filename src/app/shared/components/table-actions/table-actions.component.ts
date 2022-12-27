import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'fim-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss'],
})
export class TableActionsComponent {
  @Input()
  element: any;

  deleteClicked: boolean = false;

  @Output()
  updateChange: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  deleteChange: EventEmitter<any> = new EventEmitter<any>();

  onUpdate(element: any) {
    this.updateChange.emit(element);
  }

  onDelete(element: any) {
    this.deleteClicked = true;
    this.deleteChange.emit(element);
  }
}
