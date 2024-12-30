import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../core/services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
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
      console.log(this.form.value);
      this.authService.login(this.form.value).subscribe({
        next: (response: any) => {
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          console.error("Login failed:", err);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
