import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/types/todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todoProps: Todo | undefined;
  @Input('isEditing') isEditingProps: boolean = false;
  @Output() editingId = new EventEmitter<string>();

  setItemToEdit(): void {
    console.log('a');
    this.editingId.emit(this.todoProps?.id);
  }
}
