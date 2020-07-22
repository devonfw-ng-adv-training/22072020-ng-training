import {BookOverviewComponent} from '../book-overview/book-overview.component';
import {BookDetailsComponent} from './book-details.component';
import {Book} from '../book.model';

fdescribe('BookDetailsComponent', () => {
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
      component.book = {
        id: 0,
        title: 'Test title',
        author: 'Test author'
      };
      component.bookChange.subscribe(
        (changedBook: Book) => {
          // then
          expect(eventMock.preventDefault).toHaveBeenCalled();
          expect(eventMock.target.querySelector).toHaveBeenCalledTimes(2);
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

  });
});
