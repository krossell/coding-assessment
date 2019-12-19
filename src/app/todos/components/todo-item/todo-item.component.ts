import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ITodo } from '@app/todos/interfaces/ITodo';

@Component({
  selector: 'app-labcorp-todo-item',
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent {

  @Input()
  index: number;

  @Input()
  todo: ITodo;

  @Output()
  completeTodoItem = new EventEmitter<number>();

  @Output()
  removeTodoItem = new EventEmitter<number>();

  editing = false;

  complete(): void {
    this.completeTodoItem.emit(this.index);
  }

  edit(): void {
    this.editing = true;
  }

  remove(): void {
    this.removeTodoItem.emit(this.index);
  }

  onUpdate(todoUpdated: boolean): void {
    if (todoUpdated) {
      if (this.todo.completed) {
        this.complete();
      }
      if (this.editing) {
        this.editing = false;
      }
    }
  }

}