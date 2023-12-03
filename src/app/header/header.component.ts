import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TodoService } from '../todo.service';
import { Todo } from '../types/todo.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  text = '';
  isVisible$: Observable<boolean>;
  isAllTodoSelected$: Observable<boolean>;

  constructor(private todoService: TodoService) {
    this.isVisible$ = this.todoService.todos$.pipe(
      map((todo) => todo.length === 0)
    );
    this.isAllTodoSelected$ = this.todoService.todos$.pipe(
      map((todos) => todos.every((todo) => todo.isCompleted))
    );
  }

  changeText(event: Event) {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  onAddTodo() {
    this.todoService.addTodo(this.text);
    this.text = '';
  }

  toggleAllTodos(event: Event) {
    const target = event.target as HTMLInputElement;
    this.todoService.toggleAll(target.checked);
  }
}
