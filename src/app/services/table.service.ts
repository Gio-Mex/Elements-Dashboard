import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private reloadTableSubject = new Subject<void>();

  reloadTable$ = this.reloadTableSubject.asObservable();

  reloadTable() {
    this.reloadTableSubject.next();
  }
}
