import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  FIREBASE_SIGN_IN_URL,
  FIREBASE_SIGN_UP_URL,
} from '../constants/firebase';
import { AuthResponse } from '../Model/auth/AuthResponse';
import { User } from '../Model/user/User';
import { map, Observable, Subject, switchMap, tap } from 'rxjs';
import { Type } from '../Model/user/Type';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Api URL and local storage tokens
  private URL =
    'https://fir-rbac-demo-default-rtdb.asia-southeast1.firebasedatabase.app';
  private USER_DATA_TOKEN = 'USER_DATA';

  // User Subject which will transfer state data to all the required places
  private user: User | undefined = undefined;
  private userSubject = new Subject<User | undefined>();

  // Injecting the required dependencies
  constructor(private http: HttpClient) {}

  // This function returns the current user data
  getUser(): User | undefined {
    return this.user ? { ...this.user } : undefined;
  }

  // This function returns the current User Observable
  getUserSubject(): Observable<User | undefined> {
    return this.userSubject.asObservable();
  }

  // This function returns the current stored user in the local storage
  getUserFromLocal(): User | undefined {
    const data = localStorage.getItem(this.USER_DATA_TOKEN);
    return data ? JSON.parse(data) : undefined;
  }

  // This function stores the user data to the local storage
  setUserInLocal(user: User): void {
    this.user = user;
    this.userSubject.next(this.getUser());

    localStorage.setItem(this.USER_DATA_TOKEN, JSON.stringify(user));
  }

  // This function registers the user and stores the user data in the firebase realtime database
  registerUser(user: { name: string; email: string; password: string }) {
    return this.http
      .post<AuthResponse>(FIREBASE_SIGN_UP_URL, {
        ...user,
        returnSecureToken: true,
      })
      .pipe(
        switchMap((response) => {
          const userId = response.localId;
          const token = response.idToken;

          // Calling the API to store the user data in the realtime database
          return this.http.put(
            `${this.URL}/users/${userId}.json?auth=${token}`,
            {
              id: userId,
              name: user.name,
              email: user.email,
              type: Type.LIBRARIAN,
            }
          );
        })
      );
  }

  // This function logs in the user
  loginUser(user: { email: string; password: string }) {
    return this.http
      .post<AuthResponse>(FIREBASE_SIGN_IN_URL, {
        ...user,
        returnSecureToken: true,
      })
      .pipe(
        switchMap((response) => {
          const userId = response.localId;
          const token = response.idToken;

          return this.http
            .get(`${this.URL}/users/${userId}.json?auth=${token}`)
            .pipe(
              map((userRes) =>
                User.fromJson(userRes, response.idToken, response.refreshToken)
              ),
              tap((user: User) => this.setUserInLocal(user))
            );
        })
      );
  }
}
