import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileService } from './profile.service';
import { BASE_URL, BOOK_ENDPOINT } from '../constants/firebase';
import { Book } from '../Model/books/Book';
import { map } from 'rxjs';
import {
  mapFirebaseObjectResponse,
  mapFirebaseListResponse,
} from '../utils/firebase-response-mapper';

@Injectable({ providedIn: 'root' })
export class BookService {
  // Storing the url and tokens
  private url = `${BASE_URL}${BOOK_ENDPOINT}`;
  private token: string;

  // Injecting the necessary dependencies
  constructor(private http: HttpClient, profileService: ProfileService) {
    // Storing the initial token value
    this.token = profileService.getUser()?.token || 'Invalid Token';

    // Listening to token changes
    profileService.getUserSubject().subscribe({
      next: (user) => (this.token = user?.token || 'Invalid Token'),
    });
  }

  // This provides the auth header to the api calls
  private getHeaders() {
    return {
      headers: new HttpHeaders({ Authorization: this.token }),
    };
  }

  // This function creates a book
  createBook() {
    return this.http.post(
      `${this.url}.json`,
      {
        title: 'Dummy Book Title',
        description: 'Dummy Book Description',
        isAvailable: true,
      },
      this.getHeaders()
    );
  }

  // This function fetches all the books from the realtime database
  fetchBook() {
    return this.http
      .get<{ [key: string]: Book }>(`${this.url}.json`)
      .pipe(map((response) => mapFirebaseListResponse(response)));
  }

  // This function fetches the book by its id
  fetchBookById(id: string) {
    return this.http
      .get<Book | null>(`${this.url}/${id}.json`)
      .pipe(map((response) => mapFirebaseObjectResponse(response, id)));
  }
}
