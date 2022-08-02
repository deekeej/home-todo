import { createReducer, on } from '@ngrx/store';
import { todos } from './state';
import { actions } from './actions';

export const todoReducer = createReducer(
  todos,
  on(actions.addTodoAction, (state, todo) => {
    return [...state, todo];
  }),
  on(actions.updateTodoAction, (state, todo) => {
    return [...state.map((t) => (t.id === todo.id ? todo : t))];
  }),
  on(actions.deleteTodoAction, (state, todo) => {
    return [...state.filter((t) => t.id !== todo.id)];
  })
);
