export interface TodoModel {
  id: number;
  title: string;
  completed: boolean;
}

export let todos: TodoModel[] = [
  {
    id: 1,
    title: 'hello',
    completed: false,
  },
  {
    id: 2,
    title: 'hi',
    completed: true,
  },
];
