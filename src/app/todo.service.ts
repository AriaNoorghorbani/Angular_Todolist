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

  toggleAll(isCompleted: boolean) {
    const updatedTodo = this.todos$.getValue().map((todo) => {
      return {
        ...todo,
        isCompleted,
      };
    });
    this.todos$.next(updatedTodo);
  }
}
