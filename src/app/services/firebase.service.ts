import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  baseUrl =
    'https://dashboard-example-4560f-default-rtdb.europe-west1.firebasedatabase.app';

  userName: any;
  constructor(private http: HttpClient, private authservice: AuthService) {}

  insertUser(url: string, data: {}) {
    return this.http.post(
      this.baseUrl + url + `?auth=${this.authservice.user?.token}`,
      data
    );
  }

  public getData(url: string) {
    return this.http.get(
      this.baseUrl + url + `?auth=${this.authservice.user?.token}`
    );
  }

  getUserName(): Observable<string> {
    return this.getData('/users.json').pipe(
      map((users: any) => {
        for (let user in users) {
          if (users[user].email === this.authservice.user?.email) {
            return users[user].name;
          }
        }
        return '';
      })
    );
  }
  getElements(): Observable<string[]> {
    return this.getData('/elements.json').pipe(
      map((elements: any) => {
        const elementArray: string[] = [];
        for (let element in elements) {
          elementArray.push(elements[element]);
        }
        return elementArray;
      })
    );
  }
}
