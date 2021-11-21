import { LoginService } from './../login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public isCollapsed = false;
  isLoginned!: boolean;
  authSubscription!: Subscription;
  loggingOut!: boolean;

  constructor(private LoginService: LoginService, private router: Router) {}

  // logout() {
  //   this.loggingOut = true;

  //   this.LoginService.logout().subscribe(
  //     (res) => {
  //       localStorage.removeItem('loginToken');
  //       localStorage.removeItem('currentuser');
  //       this.LoginService.authChange.next(null);
  //       this.router.navigate(['/login']);

  //       console.log('res of logout', res);

  //       this.loggingOut = false;
  //     },
  //     (err) => {
  //       console.log('logout error', err.headers);
  //     }
  //   );
  // }
  ngOnInit(): void {
    // debugger;
    this.checkLoginned();
    this.authSubscription = this.LoginService.authChange.subscribe((res) => {
      // debugger;
      this.isLoginned = res;
    });
    // this.checkLoginned();
  }

  checkLoginned() {
    this.isLoginned = this.LoginService.checkLocalStorage();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
