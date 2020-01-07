import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TodosService } from '@app/todos/services/todos.service';
import { ITodo } from '@app/todos/interfaces';


@Component({
  selector: 'app-labcorp-todos-form',
  templateUrl: './todos-form.component.html'
})
export class TodosFormComponent implements AfterViewInit, OnInit {

  @ViewChild('todosInputField', { static: false })
  todosInputField: ElementRef;

  @Input()
  index: number = null;

  @Input()
  todo: ITodo = null;

  @Output()
  updated = new EventEmitter<boolean>();

  todosFormComp: FormGroup;

  get editOrInput(): string {
    return this.todo ? 'edit' : 'new-todo';
  }

  constructor (
    private todosService: TodosService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    const todoText: string = this.todo ? this.todo.text : '';
    this.todosFormComp = this.formBuilder.group({
      text: todoText
    });
  }

  ngAfterViewInit(): void {
    this.todosInputField.nativeElement.focus();
  }



  submit(): void {

    if (!this.todosFormComp.value.text) {
      return;
    }

    if (this.todo) {
      const completed: boolean = this.todo.completed ? true : false;
      this.todosService.updateTodo(this.index, this.todosFormComp.value.text, completed);
      this.updated.emit(true);
    } else {
      this.todosService.addTodo(this.todosFormComp.value.text);
    }

    this.todosFormComp.reset();

    if (!this.index) {
        this.todosInputField.nativeElement.focus();
    }
  }
}