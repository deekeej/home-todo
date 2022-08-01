import { createReducer, on } from '@ngrx/store';
import { todos } from './state';
import { actions } from './actions';

let lastId = todos.length;
export const todoReducer = createReducer(
  todos,
  on(actions.addTodoAction, (state, props) => {
    return [
      ...state,
      {
        id: lastId++,
        title: props.description,
        completed: false,
      },
    ];
  })
);
