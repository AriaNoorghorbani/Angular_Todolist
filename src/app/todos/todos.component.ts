import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { TodoService } from '../todo.service';
import { FilterEnum } from '../types/filter.enum';
import { Todo } from '../types/todo.interface';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent {
  visibleTodos$: Observable<Todo[]>;
  editingId: string | null = null;

  constructor(private todoService: TodoService) {
    this.visibleTodos$ = combineLatest([
      this.todoService.todos$,
      this.todoService.filter$,
    ]).pipe(
      map(([todo, filter]: [Todo[], FilterEnum]) =>
        this.filterTodo(todo, filter)
      )
    );
  }

  private filterTodo(todos: Todo[], filter: FilterEnum) {
    if (filter === FilterEnum.completed) {
      return todos.filter((todo) => todo.isCompleted);
    } else if (filter === FilterEnum.active) {
      return todos.filter((todo) => !todo.isCompleted);
    } else {
      return todos;
    }
  }

  editingIdEvent(editingId: string | null) {
    this.editingId = editingId;
  }
}
