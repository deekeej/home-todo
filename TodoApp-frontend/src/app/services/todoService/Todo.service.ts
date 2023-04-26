import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TodoModel } from 'src/app/types/todoModel';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  url = 'https://todo-back.fly.dev/api';
  constructor(private http: HttpClient) {}

  getAllTodos(id: number): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(`${this.url}/todos/${id}`);
  }

  addTodo(todo: TodoModel): Observable<TodoModel> {
    console.log('IAM adding!');
    console.log(todo);
    console.log('this is the counter of keys:' + Object.keys(todo).length);
    return this.http.post<TodoModel>(`${this.url}/todos`, todo);
  }
  deleteTodo(todo: TodoModel): Observable<TodoModel> {
    return this.http.delete<TodoModel>(`${this.url}/todos/${todo.id}`);
  }
  updateTodo(todo: TodoModel): Observable<TodoModel> {
    return this.http.put<TodoModel>(`${this.url}/todos/${todo.id}`, todo);
  }
  completeAllTodos(Ids: number[]): Observable<number[]> {
    return this.http.put<number[]>(`${this.url}/todos`, Ids);
  }
  deleteAllCompletedTodos(Ids: number[]): Observable<number[]> {
    console.log(Ids);
    return this.http.delete<number[]>(`${this.url}/todos?Ids=${Ids}`);
  }
}
