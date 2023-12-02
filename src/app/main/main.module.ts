import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HeaderModule } from '../header/header.module';
import { TodosModule } from '../todos/todos.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, TodosModule, HeaderModule],
})
export class MainModule {}
