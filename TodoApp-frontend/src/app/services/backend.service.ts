import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TodoModel } from '../todos-store/state';
@Injectable({
  providedIn: 'root',
})
export class BackendService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  url = `http://localhost:3000/api`;
  constructor(private http: HttpClient) {}

  getAllTodos(): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(`${this.url}/todos`);
  }

  addTodo(todo: TodoModel): Observable<TodoModel> {
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
