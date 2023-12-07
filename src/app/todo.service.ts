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

  changeFilter(newFilter: FilterEnum) {
    this.filter$.next(newFilter);
  }

  changeText(id: string, text: string) {
    const updatedTodo = this.todos$.getValue().map((todo) => {
      if (todo.id == id) {
        return {
          ...todo,
          text,
        };
      }
      return todo;
    });
    this.todos$.next(updatedTodo);
  }

  removeTodo(id: string): void {
    const updatedTodo = this.todos$.getValue().filter((todo) => todo.id != id);
    this.todos$.next(updatedTodo);
  }
}
