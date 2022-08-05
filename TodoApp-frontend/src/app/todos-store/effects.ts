import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { BackendService } from '../services/backend.service';
import { actions } from './actions';

@Injectable()
export class TodosEffects {
  getTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getTodosAction),
      mergeMap(() => {
        return this.TodosService.getAllTodos().pipe(
          map((todos) => actions.getTodosSuccessAction({ todos }))
        );
      })
    )
  );
  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.addTodoAction),
      mergeMap((todo) => {
        return this.TodosService.addTodo(todo).pipe(
          map((todo) => actions.addTodoAction(todo))
        );
      })
    )
  );
  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.deleteTodoAction),
      mergeMap((todo) => {
        return this.TodosService.deleteTodo(todo).pipe(
          map((todo) => actions.deleteTodoAction(todo))
        );
      })
    )
  );
  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateTodoAction),
      mergeMap((todo) => {
        return this.TodosService.updateTodo(todo).pipe(
          map((todo) => actions.updateTodoAction(todo))
        );
      })
    )
  );

  constructor(
    private TodosService: BackendService,
    private actions$: Actions
  ) {}
}
