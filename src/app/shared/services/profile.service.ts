import { Injectable } from '@angular/core';
import { User } from '../Model/user/User';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  // local storage tokens
  private USER_DATA_TOKEN = 'USER_DATA';

  // User Subject which will transfer state data to all the required places
  private user: User | undefined = undefined;
  private userSubject = new Subject<User | undefined>();

  // Injecting the required dependencies
  constructor() {
    this.user = this.getUserFromLocal();
    this.userSubject.next(this.user);
  }

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
}
