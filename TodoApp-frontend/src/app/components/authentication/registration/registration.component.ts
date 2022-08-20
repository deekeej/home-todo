import { Component, OnInit } from '@angular/core';
import { SignUpModel } from 'src/app/types/signUpModel';
import { AuthService } from 'src/app/services/authService/auth.service';

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
  isPasswordConfirmed!: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isPasswordConfirmed = true;
  }

  onSubmit() {
    if (this.password === this.confirmPassword) {
      this.isPasswordConfirmed = true;
      this.signUp();
    } else {
      this.isPasswordConfirmed = false;
    }
  }

  signUp() {
    let user: SignUpModel = {
      Name: this.name,
      Email: this.email,
      Password: this.password,
    };
    this.authService.postSignUp(user);
  }
}
