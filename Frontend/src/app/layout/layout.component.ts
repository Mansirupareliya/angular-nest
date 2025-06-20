import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  userName = 'Guest'; // default

  ngOnInit(): void {
    const userCookie = this.getCookie('name');
    if (userCookie) {
      try {
        const user = JSON.parse(decodeURIComponent(userCookie));
        this.userName = user.name || 'Guest';
      } catch (e) {
        console.error('Error parsing user cookie:', e);
      }
    }
  }

  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }
}
