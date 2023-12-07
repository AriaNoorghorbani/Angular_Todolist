import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TodoService } from 'src/app/todo.service';
import { Todo } from 'src/app/types/todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnChanges {
  @Input() todoProps: Todo | undefined;
  @Input('isEditing') isEditingProps: boolean = false;
  @Output() editingId = new EventEmitter<string>();
  @ViewChild('textInput') textInput!: ElementRef;

  editingText: string | undefined;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.editingText = this.todoProps?.text;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isEditingProps) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 0);
    }
  }

  setItemToEdit(): void {
    this.editingId.emit(this.todoProps?.id);
  }

  onRemove() {
    if (this.todoProps?.id) {
      this.todoService.removeTodo(this.todoProps?.id);
    }
  }

  toggleTodo() {
    if (this.todoProps?.id) {
      this.todoService.toggleTodo(this.todoProps?.id);
    }
  }

  changeText(event: Event) {
    const target = event.target as HTMLInputElement;
    this.editingText = target.value;
  }

  changeTodo() {
    if (this.todoProps?.id != null && this.editingText != undefined) {
      this.todoService.changeText(this.todoProps.id, this.editingText);
    } else {
      console.error('TodoProps or TodoProps.id is null or undefined.');
    }
    this.editingId.emit('');
  }
}
