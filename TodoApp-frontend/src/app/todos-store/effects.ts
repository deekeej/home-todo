import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { BackendService } from '../services/backend.service';
import { actions } from './actions';

@Injectable()
export class QuestionsEffects {
  getTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getTodosAction),
      mergeMap(() => {
        return this.TodosService.getAllTodos().pipe(
          map((todos) => actions.getTodosAction({ todos }))
        );
      })
    )
  );
  constructor(
    private TodosService: BackendService,
    private actions$: Actions
  ) {}
}
