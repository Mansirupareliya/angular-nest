import { Component } from '@angular/core';
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
  contact='';
  showDialog = false; 

  constructor(private authService: AuthService, private router : Router) {}

  onSignup() {
    this.authService
      .signup({
        name: this.name,
        email: this.email,
        password: this.password,
        co_number: Number(this.contact),
      })
      .subscribe({
        next: () => {
          this.showDialog = true; 
        },
        error: (err) => {
          alert(
            'Signup failed: ' +
              (err.error?.message?.join(', ') || 'Unknown error')
          );
          console.error(err);
        }
      });
  }

  closeDialog() {
    this.showDialog = false;
    this.router.navigate(['/login']);
  }

  onCancel() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.contact = '';
  }
}
