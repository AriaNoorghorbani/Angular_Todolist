import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  noTodosClass$: Observable<boolean>;
  activeCount$: Observable<number>;
  itemLeftText$: Observable<string>;

  constructor(private todoService: TodoService) {
    this.noTodosClass$ = this.todoService.todos$.pipe(
      map((todos) => todos.length === 0)
    );

    this.activeCount$ = this.todoService.todos$.pipe(
      map((todos) => todos.filter((todos) => !todos.isCompleted).length)
    );
    this.itemLeftText$ = this.activeCount$.pipe(
      map((activeCount) => `item${activeCount !== 1 ? 's' : ''}`)
    );
  }
}
