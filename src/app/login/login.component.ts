import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Authentication service
import { Router } from '@angular/router'; // Navigation

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form (submit)="onSubmit()"> <!-- Ensure each input has a unique name attribute -->
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" [(ngModel)]="username" name="username" required /> <!-- Add name -->
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" [(ngModel)]="password" name="password" required /> <!-- Add name -->
        </div>
        <button type="submit">Login</button>
      </form>
      <p *ngIf="errorMessage">{{ errorMessage }}</p> <!-- Display error message if any -->
    </div>
  `,
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = ''; // Bound to the input field with ngModel
  password = ''; // Bound to the input field with ngModel
  errorMessage = ''; // For displaying error messages

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        if (response.success) {
          this.router.navigate(['/app-home']); // Navigate on successful login
        } else {
          this.errorMessage = 'Invalid username or password'; // Display error message
        }
      },
      (error) => {
        this.errorMessage = 'Login failed. Please try again later.'; // Handle server errors
      }
    );
  }
}
