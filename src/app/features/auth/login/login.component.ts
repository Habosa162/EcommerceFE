import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { ILoginUser } from './../../../core/models/auth.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  error=false ;
  errorMessage="Worng email or password please try again" ;
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
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.error = true;
      this.errorMessage = "Please fill in all fields correctly.";
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
        const role = this.authService.getUserRole();
        if(role === 'Admin'){
          this.router.navigate(['/admin']);
        }else if(role === 'Customer'){
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.error = true;
        this.loginForm.reset();
        this.loginForm.markAllAsTouched() ;
      }
    });
  }


}
