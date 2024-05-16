import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav>   
      <a routerLink="/app-login">Login</a>
    </nav>
    <router-outlet></router-outlet> 
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'UltimaIncercare';
}
