import { IRegisterUser } from './../../../core/models/auth.model';
import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  selectedFile!: File;
  isSubmitted = false;
  error = false ;
  errorMessage ="" ;
  constructor(
    private fb: FormBuilder,
    private authSerive: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group(
      {
        FName: ['', [Validators.required, Validators.minLength(3)]],
        LName: ['', [Validators.required, Validators.minLength(3)]],
        Email: ['', [Validators.required, Validators.email]],
        Password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        profileImage: [null, Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('Password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }
  markTouched(field: string) {
    this.registerForm.get(field)?.markAsTouched();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  OnRegister() {


    if (this.registerForm.valid) {

      const formData = new FormData();
      formData.append('FName', this.registerForm.get('FName')?.value);
      formData.append('LName', this.registerForm.get('LName')?.value);
      formData.append('Email', this.registerForm.get('Email')?.value);
      formData.append('Password', this.registerForm.get('Password')?.value);
      formData.append('profileImage', this.selectedFile);
      this.authSerive.register(formData).subscribe({
        next: (data: any) => {
          console.log('Register successful:', data);
          if(data.token=='existed'){
            this.markTouched('Email');
            this.error = true;
            this.errorMessage = "Email already exists";
            this.registerForm.reset();
          }else{
            this.router.navigate(['/login']);
          }
        },
        error: (err: any) => {
          console.error('Register error:', err);
          this.error = true;
          this.errorMessage = "Something went wrong, please try again later";
          this.registerForm.markAllAsTouched();
          this.registerForm.reset();
        },
      });
    }
    else {
      this.isSubmitted = true;
      this.error = true;
      this.errorMessage = "Please fill all the fields correctly";
      this.registerForm.markAllAsTouched();
      this.registerForm.reset();
      console.log(this.registerForm.errors);
    }
  }
}
