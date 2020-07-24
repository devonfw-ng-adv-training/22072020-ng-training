import {BehaviorSubject, Observable} from 'rxjs';
import {Book} from './book.model';
import {Injectable} from '@angular/core';
import {delay} from 'rxjs/operators';

@Injectable()
export class BookService {
  private idSeq = 0;
  private bookSubject = new BehaviorSubject<Book[]>([
    {
      id: this.idSeq++,
      author: 'Douglas Crockford',
      title: 'JavaScript. The good parts',
    },
    {
      id: this.idSeq++,
      author: 'Kyle Simpson',
      title: 'You don\'t know JS',
    },
    {
      id: this.idSeq++,
      author: 'Marek Matczak',
      title: 'Angular for nerds',
    }
  ]);
  readonly value$ = this.bookSubject.asObservable();

  saveOrUpdateBook(bookToSaveOrUpdate: Book): Observable<Book> {
    return new Observable(subscriber => {
      const currentBooks = this.bookSubject.value;
      let newBooks: Book[];
      let newBook: Book;
      if (bookToSaveOrUpdate.id != null) { // update
        newBook = {...bookToSaveOrUpdate};
        newBooks = currentBooks.map(
          book => book.id === bookToSaveOrUpdate.id ? newBook : book);
      } else { // save
        newBook = {...bookToSaveOrUpdate, id: this.idSeq++};
        newBooks = [...currentBooks, newBook];
      }
      this.bookSubject.next(newBooks);
      subscriber.next(newBook);
      subscriber.complete();
    });
  }

  getOne(id: number): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const currentBooks = this.bookSubject.value;
      const foundBook = currentBooks.find(book => book.id === id);
      if (foundBook) {
        subscriber.next({...foundBook});
        subscriber.complete();
      } else {
        subscriber.error(`Book with ID ${id} could not be found`);
      }
    }).pipe(delay(1000));
  }
}
