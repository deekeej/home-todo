import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SignUpModel } from 'src/app/types/signUpModel';
import { LogInModel } from 'src/app/types/logInModel';
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
    withCredentials: true,
  };

  url = `http://localhost:3000/authenticate`;
  constructor(private http: HttpClient) {}

  logIn(user: LogInModel): Observable<LogInModel> {
    return this.http.post<LogInModel>(
      `${this.url}/users/login`,
      user,
      this.httpOptions
    );
  }

  signUp(user: SignUpModel): Observable<SignUpModel> {
    return this.http.post<SignUpModel>(
      `${this.url}/users/register`,
      user,
      this.httpOptions
    );
  }

  authenticate(): Observable<any> {
    return this.http.get<any>(`${this.url}/users/user`);
  }

  logout(): Observable<any> {
    return this.http.post<any>(
      `${this.url}/users/logout`,
      {},
      this.httpOptions
    );
  }

  validationOfEmail(email: string): boolean {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  validationOfName(name: string): boolean {
    return /^[a-zA-Z]{3,}$/.test(name);
  }

  validationOfPassword(password: string): boolean {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      password
    );
  }
}
