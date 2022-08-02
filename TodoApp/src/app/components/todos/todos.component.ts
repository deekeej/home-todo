import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { todosSelector } from '../../todos-store/selectors';
import { TodoModel } from '../../todos-store/state';

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
}
