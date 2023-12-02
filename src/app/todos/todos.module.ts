import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos.component';
import { RouterModule } from '@angular/router';
import { TodoComponent } from './todo/todo.component';

@NgModule({
  declarations: [TodosComponent, TodoComponent],
  imports: [CommonModule, RouterModule],
  exports: [TodosComponent],
})
export class TodosModule {}
