import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChildActivationStart } from '@angular/router';
import { map } from 'rxjs';
import { TodoService } from 'src/app/todo.service';
import { Todo } from 'src/app/types/todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input() todoProps: Todo | undefined;
  @Input('isEditing') isEditingProps: boolean = false;
  @Output() editingId = new EventEmitter<string>();

  editingText: string | undefined;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.editingText = this.todoProps?.text;
  }

  setItemToEdit(): void {
    console.log('a');
    this.editingId.emit(this.todoProps?.id);
  }

  onRemove() {
    if (this.todoProps?.id) {
      this.todoService.removeTodo(this.todoProps?.id);
    }
  }

  toggleTodo() {
    console.log('toggle todo');
  }

  changeText(event: Event) {
    const target = event.target as HTMLInputElement;
    this.editingText = target.value;
    console.log(target.value);
  }

  changeTodo() {
    if (this.todoProps?.id != null && this.editingText != undefined) {
      this.todoService.changeText(this.todoProps.id, this.editingText);
    } else {
      console.error('TodoProps or TodoProps.id is null or undefined.');
    }
    this.editingId.emit('');
  }
}
