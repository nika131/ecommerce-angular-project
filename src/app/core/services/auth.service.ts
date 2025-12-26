import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

interface User {
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private authUrl = 'http://localhost:3000/users';

  private loggedIn = new BehaviorSubject<boolean>(this.checkToken());

  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }
  
  private checkToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  signIn(credentials: any): Observable<User[]> {
    return this.http.get<User[]>(`${this.authUrl}?email=${credentials.email}&password=${credentials.password}`)
      .pipe(
        tap(users => {
          if (users.length > 0) {
            localStorage.setItem('authToken', users[0].token);
            this.loggedIn.next(true);
            console.log('User signed in:', users[0].email);
          } else {
             console.error('Invalid credentials');
          }
        }),
        catchError(error => {
          console.error('Sign-in failed:', error);
          return of([]); 
        })
      );
  }

  signUp(user: any): Observable<any> {
    return this.http.post(this.authUrl, user).pipe(
      tap((newUser: any) => {
        localStorage.setItem('authToken', newUser.token || 'mock-token-' + newUser.id);
        this.loggedIn.next(true);
      })
    );
  }

  signOut() {
    localStorage.removeItem('authToken');
    this.loggedIn.next(false);
  }
}
