import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoModel } from 'src/app/types/todoModel';
import { todosSelector } from '../../../../todos-store/selectors';
import { actions } from '../../../../todos-store/actions';
import { AuthService } from 'src/app/services/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
})
export class TodoInputComponent implements OnInit {
  todoInput?: string;
  todos?: TodoModel[];
  idOfCurrentUser!: number;
  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.authenticate().subscribe({
      next: (res: any) => {
        console.log(res.id);
        this.idOfCurrentUser = res.id;
        this.store.dispatch(
          actions.getTodosAction({ id: this.idOfCurrentUser })
        );
        this.store
          .select(todosSelector)
          .subscribe((state) => (this.todos = state));
        console.log('1', this.idOfCurrentUser);
      },
      error: () => {
        this.router.navigateByUrl('/login');
      },
    });
  }

  addTodo() {
    if (this.todoInput !== undefined) {
      console.log('this is todoInput:');
      console.log(this.todoInput);
      this.store.dispatch(
        actions.addTodoAction({
          id: this.idOfCurrentUser,
          id_user: 0,
          title: this.todoInput!,
          completed: false,
        })
      );
      this.store.dispatch(actions.getTodosAction({ id: this.idOfCurrentUser }));
      this.todoInput = undefined;
    }
  }
}
