import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { todosSelector } from '../../todos-store/selectors';
import { TodoModel } from '../../todos-store/state';
import { actions } from 'src/app/todos-store/actions';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos!: TodoModel[];
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(todosSelector).subscribe((state) => (this.todos = state));
  }

  completeAll() {
    this.store.dispatch(actions.completeAllTodoAction());
  }

  clearCompleted() {
    this.store.dispatch(actions.clearAllCompletedTodoAction());
  }

  getAll() {
    console.log('hi');
  }
  getCompleted() {
    this.store.dispatch(actions.getCompletedTodoAction());
  }

  getUncompleted() {
    this.store.dispatch(actions.getUncompletedTodoAction());
  }
}
