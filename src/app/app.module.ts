import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BookModule} from './book/book.module';
import {ResolveEnd, ResolveStart, Router, RouterModule} from '@angular/router';
import {bookRoutes} from './book/book-routes';
import {SharedModule} from './shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {SpinnerService} from './shared/spinner/spinner.service';
import {filter} from 'rxjs/operators';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'web-client/books', pathMatch: 'full'},
      {path: 'web-client', children: [...bookRoutes]}
    ]),
    BookModule.forRoot(),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(spinner: SpinnerService, router: Router) {
    router.events
      .pipe(
        filter(event => event instanceof ResolveStart || event instanceof ResolveEnd)
      )
      .subscribe(event => {
        const resolveStarts = event instanceof ResolveStart;
        resolveStarts ? spinner.on() : spinner.off();
      });
  }
}
