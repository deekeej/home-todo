import { Component, OnInit, Input } from '@angular/core';
import { TodoModel } from 'src/app/types/todoModel';
import { Store } from '@ngrx/store';
import { actions } from 'src/app/todos-store/actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo?: TodoModel;
  editTodo: boolean = false;
  @Input() completeTodo: boolean = false;
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
        id_user: 0,
        completed: this.todo!.completed,
        title: this.todoInput!,
      })
    );
  }
  completeToggle() {
    this.store.dispatch(
      actions.updateTodoAction({
        id: this.todo!.id,
        id_user: 0,
        completed: this.completeTodo,
        title: this.todo!.title,
      })
    );
  }
  deleteTodo() {
    this.store.dispatch(
      actions.deleteTodoAction({
        id: this.todo!.id,
        id_user: 0,
        completed: this.todo!.completed,
        title: this.todo!.title,
      })
    );
  }
}
