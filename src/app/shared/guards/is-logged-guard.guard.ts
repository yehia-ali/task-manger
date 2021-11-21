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
export class IsLoggedGuardGuard implements CanActivate {
  constructor(private LoginService: LoginService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.LoginService.checkLocalStorage()) {
      // there is loacal storage data which is there is logged user
      this.router.navigateByUrl('/country');
      return false;
    } else {
      return true;
    }
  }
}
