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
  onUpdateChange: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onDeleteChange: EventEmitter<any> = new EventEmitter<any>();

  onUpdate(element: any) {
    this.onUpdateChange.emit(element);
  }

  onDelete(element: any) {
    this.deleteClicked = true;
    this.onDeleteChange.emit(element);
  }
}
