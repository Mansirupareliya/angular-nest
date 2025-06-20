import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
  this.authService.login({ email: this.email, password: this.password }).subscribe({
    next: (res) => {
      const accessToken = res.token?.accessToken;
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken); 
        alert('Login successful!');
        this.router.navigate(['/dashboard'])
      } else {
        alert('Login failed: Token not found');
      }
    },
    error: (err) => {
      alert('Login failed: ' + (err.error?.message || 'Unknown error'));
      console.error(err);
    }
  });

  }
}
