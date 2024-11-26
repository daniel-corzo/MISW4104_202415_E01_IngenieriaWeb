import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private eventSubject = new Subject<string>();

  emit(event: string) {
    this.eventSubject.next(event);
  }

  on(event: string) {
    return this.eventSubject.asObservable();
  }
}
