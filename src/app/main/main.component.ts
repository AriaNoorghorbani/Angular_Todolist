import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  isVisible$: Observable<boolean>;
  constructor(private todoService: TodoService) {
    this.isVisible$ = this.todoService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
  }
}
