import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  updatedName = '';
  isEditing = false;
  message = '';
  showDialog = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUser();
  }

  fetchUser() {
    this.authService.getUser().subscribe({
      next: (res) => {
        this.user = res;
        this.updatedName = res.name;
      },
      error: (err) => {
        console.error('Failed to fetch user data:', err);
      },
    });
  }

  enableEdit() {
    this.isEditing = true;
  }

  updateUser() {
    this.authService.updateUser({ name: this.updatedName }).subscribe({
      next: () => {
        this.message = 'User updated successfully!';
        this.isEditing = false;
        this.fetchUser();
      },
      error: (err) => {
        this.message = 'Update failed!';
        console.error(err);
      },
    });
  }

  deleteUser() {
    this.showDialog = true;
  }

  handleDeleteConfirm() {
    this.showDialog = false;
    this.authService.deleteUser().subscribe({
      next: () => {
        alert('User deleted successfully!');
        this.router.navigate(['/signup']);
      },
      error: (err) => {
        alert('Delete failed');
        console.error(err);
      },
    });
  }

  handleDialogCancel() {
    this.showDialog = false;
  }
}
