import {Observable} from 'rxjs';
import {Book} from './book.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay} from 'rxjs/operators';

@Injectable()
export class BookService {
  constructor(private readonly http: HttpClient) {
  }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>('api/books')
      .pipe(
        delay(1000)
      );
  }

  saveOrUpdateBook(bookToSaveOrUpdate: Book): Observable<Book> {
    return bookToSaveOrUpdate.id != null ? this.http.put<Book>(`api/books/${bookToSaveOrUpdate.id}`, bookToSaveOrUpdate)
      : this.http.post<Book>('api/books', bookToSaveOrUpdate);
  }

  getOne(id: number): Observable<Book> {
    return this.http.get<Book>(`api/books/${id}`);
  }
}
