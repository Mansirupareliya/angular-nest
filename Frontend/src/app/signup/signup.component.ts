import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router : Router) {}

  onSignup() {
    console.log( "signup successfully" );
    this.authService.signup({ name: this.name, email: this.email, password: this.password })
      .subscribe({
        next: (res) => {
          alert('Signup successful');
          this.router.navigate(['/login'])
        },
        error: (err) => {
          alert('Signup failed: ' + (err.error?.message?.join(', ') || 'Unknown error'));
          console.error(err);
        }
      });
  }
}
