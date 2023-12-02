import { Component } from '@angular/core';
import { combineLatest, forkJoin, Observable } from 'rxjs';
import { TodoService } from '../todo.service';
import { Todo } from '../types/todo.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  // visibleTodos$: Observable<Todo[]>;

  constructor(private todoService: TodoService) {
    // this.visibleTodos$.subscribe()
  }
}
