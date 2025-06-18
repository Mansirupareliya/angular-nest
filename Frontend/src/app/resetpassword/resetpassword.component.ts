import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  email = '';
  newPassword = '';
  confirmPassword = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onResetPassword() {
    const data = {
      email: this.email,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    };

    this.authService.resetPassword(data).subscribe({
      next: (res: any) => {
        alert('Password reset successful!');
      },
      error: (err) => {
        alert('Password reset failed: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }
}
