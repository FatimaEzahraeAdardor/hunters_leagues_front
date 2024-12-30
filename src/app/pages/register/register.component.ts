import { Component } from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule , ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup;
  constructor(fb: FormBuilder,private authService: AuthService,private router: Router) {
    this.form = fb.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      cin: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required]),

    })
  }
  onSubmit() {
    if (this.form.valid) {
      this.authService.register(this.form.value).subscribe({
        next: (response: any) => {
          this.router.navigate(['login']);
        },
        error: (err) => {
          console.error("register failed:", err);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }


}
