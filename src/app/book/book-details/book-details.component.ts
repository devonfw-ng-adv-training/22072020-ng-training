import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {Book} from '../book.model';
import {BookService} from '../book.service';
import {ActivatedRoute, Data} from '@angular/router';
import {map, pluck, takeUntil, tap} from 'rxjs/operators';
import {OperatorFunction, Subject} from 'rxjs';
import {Location} from '@angular/common';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent implements OnDestroy {
  bookForm: FormGroup;
  private bookId: number | undefined;
  private unsubscribe$ = new Subject();

  constructor(private readonly books: BookService,
              private readonly location: Location,
              route: ActivatedRoute) {
    this.bookForm = new FormGroup({
      author: new FormControl('',
        [ourOwnRequired,
          onlyNamesOf('Marek', 'John'),
          Validators.maxLength(20)]),
      title: new FormControl('', Validators.required)
    });

    route.data
      .pipe( // {book: {id: 6, author: 'fdsfs'}, someOtherParam: 'some value'}
        takeUntil(this.unsubscribe$),
        getResolvedBook(), // {id: 6, author: 'fdsfs'}
        map(book => book || {author: '', title: ''}),
        tap(book => this.bookId = book.id)
      )
      .subscribe(book => this.bookForm.patchValue(book));
  }

  saveBook(): void {
    if (this.bookForm.valid) {
      const author = this.bookForm.get('author')?.value;
      const title = this.bookForm.get('title')?.value;
      const bookToSave: Book = {
        id: this.bookId, author, title
      };

      this.books.saveOrUpdateBook(bookToSave)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe(() => {
          this.location.back();
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}


function ourOwnRequired(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  return value ? null : {ourOwnRequired: true};
}

function onlyNamesOf(...names: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value) {
      return names.indexOf(value) > -1 ? null : {onlyNamesOf: [...names]};
    }
    return null;
  };
}

function getResolvedBook(): OperatorFunction<Data, Book | undefined> {
  return pluck('book');
}
