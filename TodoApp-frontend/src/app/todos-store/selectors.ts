import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TodoModel } from '../types/todoModel';

export const todosSelector = createSelector(
  createFeatureSelector('todos'),
  (todos: TodoModel[]) => todos
);
