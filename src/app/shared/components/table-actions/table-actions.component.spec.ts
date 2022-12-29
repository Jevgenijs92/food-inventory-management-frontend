import { TestBed } from '@angular/core/testing';
import { TableActionsComponent } from './table-actions.component';
import { MatIconModule } from '@angular/material/icon';
import { MockedComponentFixture, MockRender } from 'ng-mocks';
import { By } from '@angular/platform-browser';

describe('TableActionsComponent', () => {
  let component: TableActionsComponent;
  let fixture: MockedComponentFixture<
    TableActionsComponent,
    TableActionsComponent
  >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [TableActionsComponent],
    }).compileComponents();

    fixture = MockRender(TableActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should emit update event when update button is clicked', () => {
    const spy = jest.spyOn(fixture.point.componentInstance, 'onUpdate');

    fixture.debugElement
      .query(By.css('.table-actions__update'))
      .nativeElement.click();

    expect(spy).toHaveBeenCalled();
  });

  test('should emit delete event when delete button is clicked', () => {
    const spy = jest.spyOn(fixture.point.componentInstance, 'onDelete');

    fixture.debugElement
      .query(By.css('.table-actions__delete'))
      .nativeElement.click();

    expect(spy).toHaveBeenCalled();
  });

  test('should disable delete button when delete button is clicked', () => {
    const deleteButton = fixture.debugElement.query(
      By.css('.table-actions__delete')
    ).nativeElement as HTMLButtonElement;

    deleteButton.click();
    fixture.detectChanges();
    expect(fixture.point.componentInstance.deleteClicked).toBeTruthy();
    expect(deleteButton.disabled).toBeTruthy();
  });
});
