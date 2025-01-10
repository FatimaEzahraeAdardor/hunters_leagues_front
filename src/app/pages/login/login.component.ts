import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../core/services/auth.service";
import {Router} from "@angular/router";
import {CommonModule, NgOptimizedImage} from "@angular/common";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;

  // Inject AuthService properly here
  constructor(private fb: FormBuilder, private authService: AuthService ,private router: Router) {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: (response: any) => {
          const userRole = this.authService.getUserRole();
          if (userRole === 'ROLE_ADMIN') {
            this.router.navigate(['dashboard']);
          }else {
            this.router.navigate(['']);
          }
        },
        error: (err) => {
          console.error("Login failed:", err);
          alert('Invalid email or password. Please try again.');

        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
