import {Route} from '@angular/router';
import {BookDetailsComponent} from './book-details/book-details.component';
import {BookOverviewComponent} from './book-overview/book-overview.component';
import {BookResolver} from './book-details/book.resolver';

export const bookRoutes: Route[] = [
  {
    path: 'books',
    component: BookOverviewComponent
  },
  {
    path: 'book/:bookId',
    component: BookDetailsComponent,
    resolve: {
      book: BookResolver
    }
  },
  {
    path: 'book',
    component: BookDetailsComponent
  }
];
