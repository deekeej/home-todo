import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SignUpModel } from 'src/app/types/signUpModel';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
    responseType: 'text' as 'json',
  };

  url = `http://localhost:3000/authenticate`;
  constructor(private http: HttpClient) {}

  postSignUp(user: SignUpModel): Observable<SignUpModel> {
    return this.http.post<SignUpModel>(
      `${this.url}/users/register`,
      user,
      this.httpOptions
    );
  }
}
