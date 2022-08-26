import { Component, OnInit } from '@angular/core';
import { LogInModel } from 'src/app/types/logInModel';
import { AuthService } from 'src/app/services/authService/auth.service';
import { Router } from '@angular/router';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;
  response!: string;
  isLoginValid!: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoginValid = true;
  }

  onSubmit() {
    this.logIn();
  }

  logIn() {
    let user: LogInModel = {
      Email: this.email,
      Password: this.password,
    };
    this.authService.logIn(user).subscribe({
      next: (res: any) => {
        this.response = JSON.parse(JSON.stringify(res));
        AuthInterceptor.accessToken = this.response.substring(
          10,
          this.response.length - 2
        );
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.isLoginValid = false;
      },
    });
  }
}
