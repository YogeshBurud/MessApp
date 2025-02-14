import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot ){
    const user = this.authenticationService.userValue;

    if(user){
      return true;
    }

    this.router.navigate(['/login'],{ queryParams : { returnUrl : state.url } });
    return false;
  }
}
