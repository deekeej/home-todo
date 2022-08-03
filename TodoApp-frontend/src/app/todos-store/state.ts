export interface TodoModel {
  id: number;
  title: string;
  completed: boolean;
}

export const todos: TodoModel[] = [];
