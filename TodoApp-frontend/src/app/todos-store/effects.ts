import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { BackendService } from '../services/backend.service';

@Injectable()
export class QuestionsEffects {
  getPosts$ = createEffect(() => this.actions$.pipe());

  constructor(
    private questionService: BackendService,
    private actions$: Actions
  ) {}
}
