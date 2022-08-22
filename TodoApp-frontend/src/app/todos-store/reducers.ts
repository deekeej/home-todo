import { createReducer, on } from '@ngrx/store';
import { TodoModel } from '../types/todoModel';
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
  }),
  on(actions.getTodosSuccessAction, (state, action) => {
    return [...action.todos];
  }),
  on(actions.getTodosAction, (state) => {
    return [...state];
  }),
  on(actions.getCompletedTodoAction, (state) => {
    return [...state.filter((t) => t.completed)];
  }),
  on(actions.getUncompletedTodoAction, (state) => {
    return [...state.filter((t) => !t.completed)];
  }),
  on(actions.completeAllTodoAction, (state) => {
    return [
      ...state.map<TodoModel>((t) => {
        return {
          ...t,
          completed: true,
        };
      }),
    ];
  }),
  on(actions.deleteAllCompletedTodoAction, (state) => {
    return [...state.filter((t) => !t.completed)];
  })
);
