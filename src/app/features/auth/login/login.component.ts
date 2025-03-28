import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { ILoginUser } from './../../../core/models/Auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  OnLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const userObj: ILoginUser = {
      Email: this.loginForm.value.email,  
      Password: this.loginForm.value.password
    };
    this.authService.login(userObj).subscribe({
      next: (data: any) => {
        console.log('Login successful:', data);
        localStorage.setItem('token', data.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login error:', err);
      }
    });
  }


}
