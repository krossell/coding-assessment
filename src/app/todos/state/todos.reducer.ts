import { Action, createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';

import { FILTER_MODES } from './../constants/filter-modes';
import { ITodo } from '../interfaces/ITodo';

export interface ITodosState {
  filterMode?: FILTER_MODES;
  todos?: ITodo[];
}

export const initialState: ITodosState = {
  filterMode: 'All',
  todos: [],
};

export function todosReducer(state: ITodosState, action: Action) {
  return createReducer(
    initialState,
    on(TodoActions.addTodo, (existingState, { text }) => ({
      ...existingState,
      todos: [{ text, completed: false }, ...existingState.todos],
    })),
    on(TodoActions.removeTodo, (existingState, { index }) => {
      const updatedTodos = [...existingState.todos];
      updatedTodos.splice(index, 1);

      return Object.assign({}, existingState, {
        todos: updatedTodos,
      } as ITodosState);
    }),
    on(TodoActions.changeFilterMode, (existingState, { mode }) => ({
      ...existingState,
      filterMode: mode,
    })),
    on(TodoActions.clearCompleted, (existingState) => ({
      ...existingState,
      todos: [...existingState.todos.filter(todo => !todo.completed)],
    })),
    // add reducers for other operations

    on(TodoActions.updateTodo, (existingState, { index, text }) => {
      return {
        ...existingState,
        todos: existingState.todos.map(
          (todo, i) => i === index ? {...todo, text: text} : todo
        )
      } as ITodosState;
    }),
    on(TodoActions.toggleAllCompleted, (existingState) => {
      // If there exists at least one non-complete todo, mark them all complete;
      // otherwise, mark them all incomplete:
      const activeTodoExists: boolean = existingState.todos.findIndex(todo => !todo.completed) > -1;

      return Object.assign({}, existingState, {
        todos: [...existingState.todos.map(todo => {
          const todoObj = {...todo};
          todoObj.completed = activeTodoExists;
          return todoObj;
        })]
      } as ITodosState);
    }),
    on(TodoActions.toggleCompleted, (existingState, { index }) => {
      return {
        ...existingState,
        todos: existingState.todos.map(
          (todo, i) => i === index ? {...todo, completed: !todo.completed} : todo
        )
      } as ITodosState;
    })
  )(state, action);
}

export const filterMode = (state: ITodosState) => state.filterMode;
export const todos = (state: ITodosState) => state.todos;
