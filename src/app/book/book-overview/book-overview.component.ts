import {Component} from '@angular/core';
import {Book} from '../book.model';
import {BookService} from '../book.service';
import {Observable} from 'rxjs';
import {delay, pluck, switchMap, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {SpinnerService} from '../../shared/spinner/spinner.service';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  readonly books$: Observable<Book[]>;

  constructor(private readonly books: BookService,
              private readonly router: Router,
              private readonly route: ActivatedRoute,
              spinner: SpinnerService) {
    spinner.on();
    this.books$ = books.getAll()
      .pipe(
        tap(() => spinner.off()),
      );
  }

  navigateToBookDetails(book: Book): void {
    this.router.navigate(['/web-client', 'book', book.id]);
  }
}
