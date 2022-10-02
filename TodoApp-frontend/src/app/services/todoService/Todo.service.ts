import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TodoModel } from 'src/app/types/todoModel';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
    withCredentials: true,
  };

  url = 'https://todo-back.fly.dev/api';
  constructor(private http: HttpClient) {}

  getAllTodos(id: number): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(`${this.url}/todos/${id}`);
  }

  addTodo(todo: TodoModel): Observable<TodoModel> {
    console.log('IAM adding!');
    return this.http.post<TodoModel>(
      `${this.url}/todos`,
      todo,
      this.httpOptions
    );
  }
  deleteTodo(todo: TodoModel): Observable<TodoModel> {
    return this.http.delete<TodoModel>(
      `${this.url}/todos/${todo.id}`,
      this.httpOptions
    );
  }
  updateTodo(todo: TodoModel): Observable<TodoModel> {
    return this.http.put<TodoModel>(
      `${this.url}/todos/${todo.id}`,
      todo,
      this.httpOptions
    );
  }
  completeAllTodos(Ids: number[]): Observable<number[]> {
    return this.http.put<number[]>(`${this.url}/todos`, Ids, this.httpOptions);
  }
  deleteAllCompletedTodos(Ids: number[]): Observable<number[]> {
    console.log(Ids);
    return this.http.delete<number[]>(
      `${this.url}/todos?Ids=${Ids}`,
      this.httpOptions
    );
  }
}
