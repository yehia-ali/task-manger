import { Page404Component } from './page404/page404.component';
import { HomeisloginComponent } from './homeislogin/homeislogin.component';
import { CityComponent } from './city/city.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { LoginComponent } from './login/login.component';
import { IsLoggedGuardGuard } from './shared/guards/is-logged-guard.guard';

// home >
const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeisloginComponent,
    children: [
      { path: 'country', component: CountryComponent },
      { path: 'city', component: CityComponent },
    ],
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
