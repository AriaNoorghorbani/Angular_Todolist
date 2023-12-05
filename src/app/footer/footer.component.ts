import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TodoService } from '../todo.service';
import { FilterEnum } from '../types/filter.enum';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnDestroy {
  noTodosClass$: Observable<boolean>;
  activeCount$: Observable<number>;
  itemsLeftText$: Observable<string>;
  filter$: Observable<FilterEnum[]>;
  selectedFilter: string = 'all';

  private destroy$ = new Subject<void>();

  constructor(private todoService: TodoService) {
    this.noTodosClass$ = this.todoService.todos$.pipe(
      map((todos) => todos.length === 0),
      takeUntil(this.destroy$)
    );

    this.activeCount$ = this.todoService.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length),
      takeUntil(this.destroy$)
    );

    this.itemsLeftText$ = this.activeCount$.pipe(
      map((activeCount) => ` item${activeCount !== 1 ? 's' : ''}`)
    );

    this.filter$ = new BehaviorSubject<FilterEnum[]>(Object.values(FilterEnum));
  }

  onChangeFilter(event: Event, filter: FilterEnum) {
    console.log(event, filter);
    this.selectedFilter = filter;
    console.log(this.selectedFilter);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
