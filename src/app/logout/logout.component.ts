import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Authentication service
import { Router } from '@angular/router'; // Navigation

@Component({
  selector: 'app-logout',
  template: `
    <button (click)="onLogout()">Logout</button> 
  `,
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/app-login']); // Redirect to login page after logout
    });
  }
}
