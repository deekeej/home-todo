import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TodoModel } from './state';

export const todosSelector = createSelector(
  createFeatureSelector('todos'),
  (todos: TodoModel[]) => todos
);
