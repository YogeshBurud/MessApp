import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';

const USER_INFO = 'UserInfo'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // js for clear local storage
  clean(): void {
    window.localStorage.clear();
  }

  // js for save user to local storage
  saveUser(userInfo: any) {
    window.localStorage.removeItem(USER_INFO);
    window.localStorage.setItem(USER_INFO, JSON.stringify(userInfo));
  }

  // js for save user to local storage
  getUser() {
    let userInfo = window.localStorage.getItem(USER_INFO);

    if(userInfo){
      let jwtData = (JSON.parse(userInfo).token).split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      return decodedJwtData;
    }

    return null;
  }

  // js for check user is logged in
  isLoggedIn(){
    let userInfo = window.localStorage.getItem(USER_INFO);

    if(userInfo){
      return true;
    }

    return false;
  }

}
