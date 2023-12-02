import { Component, Input } from '@angular/core';
import { Todo } from 'src/app/types/todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todoProps: Todo | undefined;
}
