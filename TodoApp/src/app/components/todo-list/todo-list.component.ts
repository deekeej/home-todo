import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../todos-store/state';
import { Store } from '@ngrx/store';
import { todosSelector } from '../todos-store/selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos: TodoModel[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.store.select(todosSelector).subscribe((state) => (this.todos = state));
  }
}
