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
    } else if (!this.validationOfPassword()) {
      this.isPasswordValid = false;
    } else if (this.password !== this.confirmPassword) {
      this.isPasswordConfirmed = false;
    } else if (!this.validationOfEmail()) {
      this.isEmailValid = false;
    } else if (!this.validationOfName()) {
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
    this.authService.postSignUp(user).subscribe((res) => {
      this.response = JSON.parse(JSON.stringify(res));
      if (this.response === '{"message":"success"}') {
        this.router.navigateByUrl('/login');
      } else if (this.response === '{"message":"exists"}') {
        this.isNotEmailUsed = false;
      }
    });
  }

  validationOfEmail(): boolean {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email);
  }

  validationOfName(): boolean {
    return /^[a-zA-Z]{3,}$/.test(this.name);
  }

  validationOfPassword(): boolean {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      this.password
    );
  }
}
