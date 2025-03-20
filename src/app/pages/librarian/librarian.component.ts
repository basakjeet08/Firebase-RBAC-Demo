import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-librarian',
  templateUrl: './librarian.component.html',
  styleUrls: ['./librarian.component.css'],
})
export class LibrarianComponent implements OnInit {
  // Injecting the necessary dependencies
  constructor(private bookService: BookService) {}

  // Calling the book creation dummy api
  ngOnInit(): void {
    this.bookService.createBook().subscribe({
      // Success State
      next: () => this.fetchBooks(),

      // Error State
      error: (error) => console.log(error),
    });
  }

  // This function fetches the book list
  fetchBooks() {
    this.bookService.fetchBook().subscribe({
      // Success State
      next: (data) => console.log(data),
      // Error State
      error: (error) => console.log(error),
    });
  }
}
