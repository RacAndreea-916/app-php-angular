import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // Import tap to perform side effects in RxJS

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginUrl = 'http://localhost/temaPHPAngular/login.php';
  private readonly logoutUrl = 'http://localhost/temaPHPAngular/logout.php';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(this.loginUrl, body).pipe(
      tap((response: any) => {
        if (response.success) {
          // Store the JWT in localStorage (or sessionStorage, depending on your preference)
          localStorage.setItem('authToken', response.token);
        }
      })
    );
  }

  logout(): Observable<any> {
    // Optionally clear the JWT upon logout
    localStorage.removeItem('authToken');
    return this.http.post(this.logoutUrl, {});
  }
}
