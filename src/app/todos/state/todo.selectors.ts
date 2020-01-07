import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as todosState from './todos.reducer';
import { ITodo } from '../interfaces';
export const todosSelector = createFeatureSelector<todosState.ITodosState>('todos');

export const allTodos = createSelector(
  todosSelector,
  todosState.todos,
);

export const todosListExist = createSelector(
  allTodos,
  (todoList) => {
    return todoList && todoList.length;
  }
);

export const filterMode = createSelector(
  todosSelector,
  todosState.filterMode
);

export const completedTodosList = createSelector(
  allTodos,
  (todoList) => {
    return todoList && todoList.filter(todo => todo.completed);
  }
);

export const activeTodosList = createSelector(
  allTodos,
  (todoList) => {
    return todoList && todoList.filter(todo => !todo.completed);
  }
);
    
export const filteredTodosList = createSelector(
  filterMode,
  allTodos,
  (userMode, todoList) => {
    let listReturned: ITodo[];
    // send back the list of Todos based on user selection
    switch (userMode) {
      case 'Completed':
        listReturned = todoList.filter(todo => todo.completed);
        break;
      case 'Active':
        listReturned = todoList.filter(todo => !todo.completed);
        break;
      default:
        listReturned = todoList;
    }
    return listReturned;
  }
);