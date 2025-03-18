import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  FIREBASE_SIGN_IN_URL,
  FIREBASE_SIGN_UP_URL,
} from '../constants/firebase';
import { AuthResponse } from '../Model/auth/AuthResponse';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Injecting the required dependencies
  constructor(private http: HttpClient) {}

  // This function registers the user and stores the user data in the firebase realtime database
  registerUser(user: { name: string; email: string; password: string }) {
    return this.http.post<AuthResponse>(FIREBASE_SIGN_UP_URL, {
      ...user,
      returnSecureToken: true,
    });
  }

  // This function logs in the user
  loginUser(user: { email: string; password: string }) {
    return this.http.post<AuthResponse>(FIREBASE_SIGN_IN_URL, {
      ...user,
      returnSecureToken: true,
    });
  }
}
