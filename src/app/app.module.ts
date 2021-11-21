import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CountryComponent } from './country/country.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DataTablesModule } from 'angular-datatables';
import { CityComponent } from './city/city.component';
import { AddCountryComponent } from './country/add-country/add-country.component';
import { AddCityComponent } from './city/add-city/add-city.component';
import { HomeisloginComponent } from './homeislogin/homeislogin.component';
import { Page404Component } from './page404/page404.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CountryComponent,
    HeaderComponent,
    SidenavComponent,
    CityComponent,
    AddCountryComponent,
    AddCityComponent,
    HomeisloginComponent,
    Page404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
