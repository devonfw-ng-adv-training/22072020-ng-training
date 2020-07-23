import {BookOverviewComponent} from '../book-overview/book-overview.component';
import {BookDetailsComponent} from './book-details.component';
import {Book} from '../book.model';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {compareSegments} from '@angular/compiler-cli/ngcc/src/sourcemaps/segment_marker';

fdescribe('BookDetailsComponent', () => {
  let testBook: Book;

  beforeEach(() => {
    testBook = {
      id: 0,
      title: 'Test title',
      author: 'Test author'
    };
  });

  describe('(class)', () => {
    it('fires an event on book change', () => {
      // given
      const eventMock = {
        preventDefault: jasmine.createSpy('preventDefault'),
        target: jasmine.createSpyObj(['querySelector'])
      } as any;
      eventMock.target.querySelector.and.callFake((selector: string) => {
        const value = selector === '#author' ? 'New Author' : 'New Title';
        return {value};
      });
      const component = new BookDetailsComponent();
      component.book = testBook;
      component.bookChange.subscribe(
        (changedBook: Book) => {
          // then
          expect(eventMock.preventDefault).toHaveBeenCalled();
          expect(eventMock.target.querySelector).toHaveBeenCalledTimes(2);
          expect(eventMock.target.querySelector).toHaveBeenCalledWith('#author');
          expect(eventMock.target.querySelector).toHaveBeenCalledWith('#title');
          expect(changedBook.id).toBe(0);
          expect(changedBook.author).toBe('New Author');
          expect(changedBook.title).toBe('New Title');
        }
      );
      // when
      component.notifyOnBookChange(eventMock);
    });
  });

  describe('(DOM)', () => {
    let fixture: ComponentFixture<BookDetailsComponent>;
    let component: BookDetailsComponent;
    let element: HTMLElement;

    beforeEach(() => {
      return TestBed.configureTestingModule({
        declarations: [BookDetailsComponent]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(BookDetailsComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
    });

    it('fires an event on submit', () => {
      // given
      component.book = testBook;
      fixture.detectChanges();
      component.bookChange.subscribe((changedBook: Book) => {
        // then
        expect(changedBook).toEqual(testBook);
      });
      // when
      const submitButton = element.querySelector<HTMLButtonElement>('button');
      submitButton ? submitButton.click() : fail('Submit button not found in the template');
    });

    it('notifies on changed book', () => {
      // given
      const newAuthorValue = 'Updated author';
      component.book = testBook;
      fixture.detectChanges();
      component.bookChange.subscribe((changedBook: Book) => {
        // then
        expect(changedBook.author).toBe(newAuthorValue);
      });
      // when
      const authorElement = element.querySelector<HTMLInputElement>('#author');
      authorElement ? authorElement.value = newAuthorValue : fail('Author input not found');
      const submitButton = element.querySelector<HTMLButtonElement>('button');
      submitButton ? submitButton.click() : fail('Submit button not found in the template');
    });
  });
});
