import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserInfo } from '../model/userInfo'
import { environment } from '../../environment/environment';
import { loginInfo } from '../model/login';

const LOGIN_API_URL = environment.apiUrl + '/api/Auth/login';

const httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
 };

@Injectable({
   providedIn: 'root'
})
export class AuthenticationService {

   private userSubject: BehaviorSubject<UserInfo | null>;
   public user: Observable<UserInfo | null>;

   constructor(
      private router: Router,
      private http: HttpClient
   ) {
      this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!))
      this.user = this.userSubject.asObservable();
   }

   public get userValue() {
      return this.userSubject.value;
   }

   login(username: string, password: string) {
      let bodyParameter : loginInfo =
      {
         "email": username,
         "password": password
      }

      return this.http.post<UserInfo>(LOGIN_API_URL, bodyParameter, httpOptions).pipe(map(user => {
         localStorage.setItem('UserInfo', JSON.stringify(user));
         this.userSubject.next(user);
         return user;
      }))
   }

   logout() {
      localStorage.removeItem('UserInfo');
      this.userSubject.next(null);
      this.router.navigate(['/login']);
   }

}
