import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private valueSubject = new Subject<boolean>();
  readonly value$ = this.valueSubject.asObservable();

  on(): void {
    this.valueSubject.next(true);
  }

  off(): void {
    this.valueSubject.next(false);
  }
}
