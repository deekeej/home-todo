import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { todosSelector } from '../../todos-store/selectors';
import { TodoModel } from '../../todos-store/state';
import { actions } from 'src/app/todos-store/actions';
import { Observable } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos!: TodoModel[];
  constructor(private store: Store, private backend: BackendService) {}

  ngOnInit(): void {
    this.store.dispatch(actions.getTodosAction());
    this.store.select(todosSelector).subscribe((state) => (this.todos = state));
  }

  completeAll() {
    this.store.dispatch(actions.completeAllTodoAction());
    console.log('hI');
    this.backend.completeAllTodos(this.todos.map((t) => t.id));
  }

  clearCompleted() {
    this.store.dispatch(actions.clearAllCompletedTodoAction());
  }

  getAll() {
    this.store.dispatch(actions.getTodosAction());
  }
  getCompleted() {
    this.store.dispatch(actions.getCompletedTodoAction());
  }

  getUncompleted() {
    this.store.dispatch(actions.getUncompletedTodoAction());
  }
}
