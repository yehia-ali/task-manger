import { LoginService } from './../../login/login.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(private LoginService: LoginService, private router: Router) {
    // this.AuthServiceService.authChange.subscribe((resState) => {
    //   debugger;
    //   console.log("resSTate", resState);
    //   this.todosActivate = resState;
    // });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem('currentuser')) {
      return true;
    } else {
      return false;
    }
  }
}
