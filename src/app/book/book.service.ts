import {BehaviorSubject, Observable} from 'rxjs';
import {Book} from './book.model';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private bookSubject = new BehaviorSubject<Book[]>([
    {
      id: 0,
      author: 'Douglas Crockford',
      title: 'JavaScript. The good parts',
    },
    {
      id: 1,
      author: 'Kyle Simpson',
      title: 'You don\'t know JS',
    },
    {
      id: 2,
      author: 'Marek Matczak',
      title: 'Angular for nerds',
    }
  ]);
  readonly value$ = this.bookSubject.asObservable();

  updateBook(bookToUpdate: Book): Observable<Book> {
    return new Observable(subscriber => {
      const bookCopy: Book = {...bookToUpdate};
      const currentBooks = this.bookSubject.value;
      const newBooks = currentBooks.map(
        book => book.id === bookToUpdate.id ? bookCopy : book);
      this.bookSubject.next(newBooks);
      subscriber.next(bookCopy);
      subscriber.complete();
    });
  }
}
