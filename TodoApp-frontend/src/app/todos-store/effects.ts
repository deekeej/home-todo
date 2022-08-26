import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { TodoService } from '../services/todoService/todo.service';
import { actions } from './actions';

@Injectable()
export class TodosEffects {
  getTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getTodosAction),
      mergeMap((user) => {
        return this.TodosService.getAllTodos(user.id).pipe(
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
  completeAllTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.completeAllTodoAction),
      mergeMap((action) => {
        return this.TodosService.completeAllTodos(action.Ids).pipe(
          map((id) => actions.completeAllTodoAction({ Ids: id }))
        );
      })
    )
  );
  deleteAllCompletedTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.deleteAllCompletedTodoAction),
      mergeMap((action) => {
        return this.TodosService.deleteAllCompletedTodos(action.Ids).pipe(
          map((id) => actions.deleteAllCompletedTodoAction({ Ids: id }))
        );
      })
    )
  );

  constructor(private TodosService: TodoService, private actions$: Actions) {}
}
