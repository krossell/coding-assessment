import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ITodo } from '../interfaces';
import { ITodosState } from '../state/todos.reducer';
import { FILTER_MODES } from '../constants/filter-modes';
import * as TodoActions from '../state/todo.actions';
import * as todoSelectors from '../state/todo.selectors';

@Injectable()
export class TodosService {

  allTodos$: Observable<ITodo[]>;
  filteredTodosList$: Observable<ITodo[]>;
  allActiveTodos$: Observable<ITodo[]>;
  allFilterModes$: Observable<FILTER_MODES>;

  constructor(
    private store: Store<ITodosState>,
  ) {
    this.allTodos$ = this.store.select(todoSelectors.allTodos);
    this.allFilterModes$ = this.store.select(todoSelectors.filterMode);
    this.allActiveTodos$ = this.store.select(todoSelectors.activeTodosList);
    this.filteredTodosList$ = this.store.select(todoSelectors.filteredTodosList);
  }

  addTodo(text: string): void {
    this.store.dispatch(TodoActions.addTodo({ text }));
  }

  removeTodo(index: number): void {
    this.store.dispatch(TodoActions.removeTodo({ index }));
  }

  toggleComplete(index: number): void {
    this.store.dispatch(TodoActions.toggleCompleted({ index }));
  }

  toggleAllCompleted(): void {
    this.store.dispatch(TodoActions.toggleAllCompleted());
  }

  updateTodo(index: number, text: string, completed: boolean): void {
    this.store.dispatch(TodoActions.updateTodo({ index, text, completed }));
  }

  changeFilterMode(mode: FILTER_MODES): void {
    this.store.dispatch(TodoActions.changeFilterMode({ mode }));
  }

  clearCompleted(): void {
    this.store.dispatch(TodoActions.clearCompleted());
  }
}
