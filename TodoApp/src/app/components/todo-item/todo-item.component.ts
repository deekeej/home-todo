import { Component, OnInit, Input } from '@angular/core';
import { TodoModel } from '../todos-store/state';
import { Store } from '@ngrx/store';
import { actions } from '../todos-store/actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo?: TodoModel;
  editTodo: boolean = false;
  completeTodo: boolean = false;
  todoInput?: string;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.completeTodo = this.todo!.completed;
    this.todoInput = this.todo!.title;
  }

  updateToggle() {
    this.editTodo = !this.editTodo;
  }

  updateTodo() {
    this.editTodo = !this.editTodo;
    this.store.dispatch(
      actions.updateTodoAction({
        id: this.todo!.id,
        completed: this.todo!.completed,
        title: this.todoInput!,
      })
    );
  }
  completeToggle() {
    this.completeTodo = !this.completeTodo;
    console.log('hi');
    this.store.dispatch(
      actions.updateTodoAction({
        id: this.todo!.id,
        completed: this.completeTodo,
        title: this.todo!.title,
      })
    );
  }
  deleteTodo() {
    this.store.dispatch(
      actions.deleteTodoAction({
        id: this.todo!.id,
        completed: this.todo!.completed,
        title: this.todo!.title,
      })
    );
  }
}
