import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { FILTER_MODES } from '@app/todos/constants/filter-modes';
import { TodosService } from '@app/todos/services/todos.service';


@Component({
  selector: 'app-labcorp-todos-footer',
  templateUrl: './todos-footer.component.html'
})
export class TodosFooterComponent implements OnInit, OnDestroy {

 
  filterMode: FILTER_MODES;
  filters: string[] = ['All', 'Active', 'Completed'];
  subscription: Subscription;
  filterChoice: string;
  numberOfTodos: number;
  countString: string;
  completedExist: boolean;

  constructor(
    private todosService: TodosService
  ) { }

  ngOnInit() {
    this.filterChoice = 'All';
    this.subscription = combineLatest([
      this.todosService.allFilterModes$,
      this.todosService.allTodos$,
      this.todosService.allActiveTodos$
    ])
    .subscribe(state => {
      this.filterMode = state[0];
      this.filterChoice = this.filterMode;
      const allTodos = state[1];
      const activeTodoItems = state[2];
      const todosExist: boolean = allTodos && allTodos.length > 0;
      if (todosExist) {
        this.numberOfTodos = allTodos.length;
        const oneOrMore: string = activeTodoItems.length === 1 ? 'item' : 'items';
        this.countString = `${activeTodoItems.length} ${oneOrMore} left`;
        this.completedExist = allTodos.findIndex(todo => todo.completed) > -1;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectFilter(mode: FILTER_MODES, $event: Event): void {
    this.filterChoice = mode;
    this.todosService.changeFilterMode(mode);
    $event.preventDefault();
  }

  clearCompleted(): void {
    this.todosService.clearCompleted();
  }

}