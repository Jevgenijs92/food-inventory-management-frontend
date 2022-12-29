import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableActionsComponent } from './table-actions.component';
import { MatIconModule } from '@angular/material/icon';
import { MockRender } from 'ng-mocks';

describe('TableActionsComponent', () => {
  let component: TableActionsComponent;
  let fixture: ComponentFixture<TableActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [TableActionsComponent],
    }).compileComponents();

    fixture = MockRender(TableActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
