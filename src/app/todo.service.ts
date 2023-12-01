import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './types/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos$ = new BehaviorSubject<Array<Todo>>([]);

  constructor() {}

  addTodo(todo: string) {
    const newTodo: Todo = {
      id: Math.random().toString(16),
      text: todo,
      isCompleted: false,
    };
    const updatedTodo = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodo);
  }
}
