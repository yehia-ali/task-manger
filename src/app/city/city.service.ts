import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  cities = [];
  getCityHeader!: HttpHeaders;
  myLoginToken!: string;

  constructor(private http: HttpClient) {
    this.myLoginToken = 'Bearer ' + localStorage.getItem('loginToken');
  }
  getCities() {
    this.getCityHeader = new HttpHeaders().set(
      'Authorization',
      this.myLoginToken
    );

    return this.http.get('https://taskfrontendapi.azurewebsites.net/api/city', {
      headers: this.getCityHeader,
    });
  }
  // Add Country
  AddCity(city: any) {
    this.getCityHeader = new HttpHeaders().set(
      'Authorization',
      this.myLoginToken
    );

    return this.http.post(
      'https://taskfrontendapi.azurewebsites.net/api/city',
      city,
      {
        headers: this.getCityHeader,
      }
    );
  }

  editcity(city: any) {
    debugger;
    this.getCityHeader = new HttpHeaders().set(
      'Authorization',
      this.myLoginToken
    );

    return this.http.put(
      `https://taskfrontendapi.azurewebsites.net/api/city`,
      city,
      {
        headers: this.getCityHeader,
      }
    );
  }

  deleteCity(id: any) {
    this.getCityHeader = new HttpHeaders().set(
      'Authorization',
      this.myLoginToken
    );

    return this.http.delete(
      `https://taskfrontendapi.azurewebsites.net/api/city/${id}`,
      {
        headers: this.getCityHeader,
      }
    );
  }
}
