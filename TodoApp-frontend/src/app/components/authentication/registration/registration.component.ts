import { Component, OnInit } from '@angular/core';
import { SignUpModel } from 'src/app/types/signUpModel';
import { AuthService } from 'src/app/services/authService/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  name!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
  isNameValid!: boolean;
  isPasswordConfirmed!: boolean;
  isEmailValid!: boolean;
  isAllFill!: boolean;
  isPasswordValid!: boolean;
  response!: string;
  isNotEmailUsed!: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isPasswordConfirmed = true;
    this.isEmailValid = true;
    this.isNameValid = true;
    this.isAllFill = true;
    this.isPasswordValid = true;
    this.isNotEmailUsed = true;
  }

  onSubmit() {
    if (!this.password || !this.confirmPassword || !this.name || !this.email) {
      this.isAllFill = false;
    } else if (!this.authService.validationOfPassword(this.password)) {
      this.isPasswordValid = false;
    } else if (this.password !== this.confirmPassword) {
      this.isPasswordConfirmed = false;
    } else if (!this.authService.validationOfEmail(this.email)) {
      this.isEmailValid = false;
    } else if (!this.authService.validationOfName(this.name)) {
      this.isNameValid = false;
    } else {
      this.isPasswordConfirmed = true;
      this.signUp();
    }
  }

  signUp() {
    let user: SignUpModel = {
      Name: this.name,
      Email: this.email,
      Password: this.password,
    };
    this.authService.signUp(user).subscribe({
      next: (res: any) => {
        this.router.navigateByUrl('/login');
      },
      error: () => {
        this.isNotEmailUsed = false;
      },
    });
  }
}
