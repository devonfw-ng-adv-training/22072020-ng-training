import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Book} from '../book.model';
import {Observable, throwError} from 'rxjs';
import {BookService} from '../book.service';
import {delay} from 'rxjs/operators';

@Injectable()
export class BookResolver implements Resolve<Book> {
  constructor(private readonly books: BookService,
              private readonly router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    const bookIdAsString = route.paramMap.get('bookId');
    if (bookIdAsString) {
      const bookId = +bookIdAsString;
      if (!isNaN(bookId)) {
        return this.books.getOne(bookId).pipe(delay(1000));
      }
    }
    this.router.navigate(['/book']);
    return throwError('Book ID is wrong!');
  }
}
