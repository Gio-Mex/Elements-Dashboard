import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { environment } from '../../enviroments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  APIKey =environment.firebaseAPIKey;
  signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.APIKey}`;
  signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.APIKey}`;

  isLoggedIn = false;
  user: User | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  isAuthenticated() {
    return this.isLoggedIn;
  }

  createUser(email: string, id: string, token: string, expirationDate: Date) {
    this.user = new User(email, id, token, expirationDate);
    this.isLoggedIn = true;
  }

  signUp(email: string, password: string) {
    this.router.navigate(['/signin']);
    return this.http.post(this.signUpUrl, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }

  signIn(email: string, password: string) {
    return this.http.post(this.signInUrl, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }

  logout() {
    this.user = null;
    this.isLoggedIn = false;
    localStorage.removeItem('user');
    this.router.navigate(['/signin']);
  }
}
