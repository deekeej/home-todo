import { TodoModel } from './state';
import { createAction, props } from '@ngrx/store';

const addTodoAction = createAction('[TODO] ADD_TODO', props<TodoModel>());
const updateTodoAction = createAction('[TODO] UPDATE_TODO', props<TodoModel>());
const deleteTodoAction = createAction('[TODO] DELETE_TODO', props<TodoModel>());

export const actions = { addTodoAction, updateTodoAction, deleteTodoAction };
