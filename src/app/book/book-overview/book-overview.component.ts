import {Component} from '@angular/core';
import {Book} from '../book.model';
import {BookService} from '../book.service';
import {Observable} from 'rxjs';
import {delay} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  readonly books$: Observable<Book[]>;

  constructor(private readonly books: BookService,
              private readonly router: Router) {
    this.books$ = books.getAll()
      .pipe(
        delay(1000)
      );
  }

  navigateToBookDetails(book: Book): void {
    this.router.navigate(['/book', book.id]);
  }
}
