import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showLoginError!: string;
  isLoadinglogin: boolean;
  loginSubscription!: Subscription;
  constructor(
    private fb: FormBuilder,
    private LoginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
    this.isLoadinglogin = false;
  }

  loginSubmit() {
    this.isLoadinglogin = true;

    debugger;
    this.loginSubscription = this.LoginService.login(
      this.loginForm.value
    ).subscribe(
      (res: any) => {
        console.log('response from login : ', res);
        localStorage.setItem('loginToken', res.token);
        this.router.navigate(['home/country']);
        this.toastr.success('Success Login');
      },
      (err) => {
        this.toastr.error('error in email or password');
      }
    );

    this.isLoadinglogin = false;
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}
