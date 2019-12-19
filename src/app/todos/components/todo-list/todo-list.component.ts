import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';

import { TodosService } from '@app/todos/services/todos.service';
import { FILTER_MODES } from '@app/todos/constants/filter-modes';
import { ITodo } from '@app/todos/interfaces/ITodo';


@Component({
  selector: 'app-todos-list',
  styleUrls: [
    './todo-list.component.scss',
  ],
  templateUrl: './todo-list.component.html',
})
export class TodosListComponent implements OnDestroy, OnInit {


  subscription: Subscription;
  todoList: ITodo[];
  filterModeChoice: FILTER_MODES;

  constructor (
    private todosService: TodosService
  ) {}

  ngOnInit(): void {
    this.subscription = combineLatest([
      this.todosService.allFilterModes$,
      this.todosService.filteredTodosList$
    ])
    .subscribe(state => {
      this.filterModeChoice = state[0];
      this.todoList = state[1];
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeTodoItem(index: number): void {
    this.todosService.removeTodo(index);
  }

  completeTodoItem(index: number): void {
    this.todosService.toggleComplete(index);
  }
}
