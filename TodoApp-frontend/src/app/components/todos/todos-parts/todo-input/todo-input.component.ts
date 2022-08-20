import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoModel } from 'src/app/types/todoModel';
import { todosSelector } from '../../../../todos-store/selectors';
import { actions } from '../../../../todos-store/actions';
@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
})
export class TodoInputComponent implements OnInit {
  todoInput?: string;
  todos?: TodoModel[];
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(todosSelector).subscribe((state) => (this.todos = state));
  }

  addTodo() {
    if (this.todoInput != '' || this.todoInput != null) {
    }
    this.store.dispatch(
      actions.addTodoAction({
        id: this.todos!.length,
        title: this.todoInput!,
        completed: false,
      })
    );
    this.todoInput = '';
  }
}
