import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HeaderModule } from '../header/header.module';
import { ListModule } from '../list/list.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, ListModule, HeaderModule],
})
export class MainModule {}
