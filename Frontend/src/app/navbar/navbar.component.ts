import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [MessageService],
})
export class NavbarComponent {
  showDialog: boolean = false;
  name: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  openUpdateDialog() {
    this.showDialog = true;
  }

  updateUser() {
    if (!this.name.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Missing Name',
        detail: 'Please enter a name.',
      });
      return;
    }

    this.authService.updateUser({ name: this.name }).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Updated',
          detail: 'Name updated successfully.',
        });
        this.showDialog = false;
        this.name = '';
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'Update failed.',
        });
      },
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Logged Out',
          detail: 'You have been logged out.',
        });
        this.router.navigate(['/login']);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'Logout failed.',
        });
      },
    });
  }
}
