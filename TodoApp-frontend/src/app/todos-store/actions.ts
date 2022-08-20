import { TodoModel } from '../types/todoModel';
import { SignUpModel } from '../types/signUpModel';
import { createAction, props } from '@ngrx/store';

const getTodosAction = createAction('[TODO] GET_TODOS');
const getTodosSuccessAction = createAction(
  '[TODO] GET_TODOS_SUCCESS',
  props<{ todos: TodoModel[] }>()
);
const addTodoAction = createAction('[TODO] ADD_TODO', props<TodoModel>());
const updateTodoAction = createAction('[TODO] UPDATE_TODO', props<TodoModel>());
const deleteTodoAction = createAction('[TODO] DELETE_TODO', props<TodoModel>());
const getUncompletedTodoAction = createAction('[TODO] UNCOMPLETED_TODOS');
const getCompletedTodoAction = createAction('[TODO] COMPLETED_TODOS');
const completeAllTodoAction = createAction(
  '[TODO] COMPLETE_ALL_TODOS',
  props<{ Ids: number[] }>()
);
const deleteAllCompletedTodoAction = createAction(
  '[TODO] CLEAR_ALL_TODOS',
  props<{ Ids: number[] }>()
);
const addUserAction = createAction('[SignUp] ADD_User', props<SignUpModel>());

export const actions = {
  addTodoAction,
  updateTodoAction,
  deleteTodoAction,
  getTodosAction,
  getUncompletedTodoAction,
  getCompletedTodoAction,
  completeAllTodoAction,
  deleteAllCompletedTodoAction,
  getTodosSuccessAction,
  addUserAction,
};
