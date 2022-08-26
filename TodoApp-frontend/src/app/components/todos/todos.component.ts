import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { todosSelector } from '../../todos-store/selectors';
import { TodoModel } from 'src/app/types/todoModel';
import { actions } from 'src/app/todos-store/actions';
import { AuthService } from 'src/app/services/authService/auth.service';
import { Router } from '@angular/router';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos!: TodoModel[];
  idOfCurrentUser!: number;
  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.select(todosSelector).subscribe((state) => {
      this.todos = state;
    });
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
    if (this.idOfCurrentUser === undefined) {
      this.idOfCurrentUser = this.todos[0].id_user;
    }
    this.store.dispatch(actions.getTodosAction({ id: this.idOfCurrentUser }));
  }
  getCompleted() {
    if (this.idOfCurrentUser === undefined) {
      this.idOfCurrentUser = this.todos[0].id_user;
    }
    this.store.dispatch(actions.getCompletedTodoAction());
  }

  getUncompleted() {
    if (this.idOfCurrentUser === undefined) {
      this.idOfCurrentUser = this.todos[0].id_user;
    }
    this.store.dispatch(actions.getUncompletedTodoAction());
  }

  logout() {
    this.authService.logout().subscribe(() => {
      AuthInterceptor.accessToken = '';
      this.router.navigateByUrl('/login');
    });
  }
}
