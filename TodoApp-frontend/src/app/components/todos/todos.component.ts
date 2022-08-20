import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { todosSelector } from '../../todos-store/selectors';
import { TodoModel } from 'src/app/types/todoModel';
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
    this.store.dispatch(actions.getTodosAction());
    this.store.select(todosSelector).subscribe((state) => (this.todos = state));
  }

  completeAll() {
    this.store.dispatch(
      actions.completeAllTodoAction({ Ids: this.todos.map((t) => t.id) })
    );
  }

  clearCompleted() {
    this.store.dispatch(
      actions.deleteAllCompletedTodoAction({
        Ids: this.todos.filter((t) => t.completed).map((t) => t.id),
      })
    );
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
