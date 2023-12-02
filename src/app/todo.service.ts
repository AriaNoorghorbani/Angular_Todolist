import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { FilterEnum } from './types/filter.enum';
import { Todo } from './types/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos$ = new BehaviorSubject<Todo[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  filteredTodos$: Observable<Todo[]>;

  constructor() {
    this.filteredTodos$ = combineLatest([this.todos$, this.filter$]).pipe(
      map(([todo, filter]) => this.filterTodos(todo, filter))
    );
  }

  addTodo(todo: string) {
    const newTodo: Todo = {
      id: Math.random().toString(16),
      text: todo,
      isCompleted: false,
    };
    const updatedTodo = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodo);
    console.log(this.todos$.getValue());
  }

  private filterTodos(todos: Todo[], filter: FilterEnum): Todo[] {
    if (filter === FilterEnum.all) {
      return todos;
    } else if (filter === FilterEnum.completed) {
      return todos.filter((todo) => todo.isCompleted);
    } else if (filter === FilterEnum.active) {
      return todos.filter((todo) => !todo.isCompleted);
    }

    return [];
  }
}
