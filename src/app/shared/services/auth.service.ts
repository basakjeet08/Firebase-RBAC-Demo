import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BASE_URL,
  FIREBASE_SIGN_IN_URL,
  FIREBASE_SIGN_UP_URL,
  USER_ENDPOINT,
} from '../constants/firebase';
import { AuthResponse } from '../Model/auth/AuthResponse';
import { User } from '../Model/user/User';
import { map, switchMap, tap } from 'rxjs';
import { Type } from '../Model/user/Type';
import { ProfileService } from './profile.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Injecting the required dependencies
  constructor(
    private http: HttpClient,
    private profileService: ProfileService
  ) {}

  // This function registers the user and stores the user data in the firebase realtime database
  registerUser(user: { name: string; email: string; password: string }) {
    return this.http
      .post<AuthResponse>(FIREBASE_SIGN_UP_URL, {
        ...user,
        returnSecureToken: true,
      })
      .pipe(
        switchMap((response) =>
          this.storeUserData(response, user.name, Type.LIBRARIAN)
        )
      );
  }

  // This function stores the user data to the firebase realtime database
  storeUserData(authResponse: AuthResponse, name: string, type: Type) {
    const userId = authResponse.localId;
    const token = authResponse.idToken;

    // Calling the API to store the data
    return this.http.put(
      `${BASE_URL}/${USER_ENDPOINT}/${userId}.json?auth=${token}`,
      {
        id: userId,
        name: name,
        email: authResponse.email,
        type: type,
      }
    );
  }

  // This function logs in the user
  loginUser(user: { email: string; password: string }) {
    return this.http
      .post<AuthResponse>(FIREBASE_SIGN_IN_URL, {
        ...user,
        returnSecureToken: true,
      })
      .pipe(switchMap((response) => this.fetchUserData(response)));
  }

  // This function fetches the logged in user details from the firebase realtime database
  fetchUserData(authResponse: AuthResponse) {
    const userId = authResponse.localId;
    const token = authResponse.idToken;

    return this.http
      .get<User>(`${BASE_URL}/${USER_ENDPOINT}/${userId}.json?auth=${token}`)
      .pipe(
        map((user) => {
          return { ...user, token, refreshToken: authResponse.refreshToken };
        }),
        tap((user: User) => this.profileService.setUserInLocal(user))
      );
  }
}
