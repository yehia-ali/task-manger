import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  Countries = [];
  getCountryHeader!: HttpHeaders;
  myLoginToken!: string;

  constructor(private http: HttpClient) {
    this.myLoginToken = 'Bearer ' + localStorage.getItem('loginToken');
  }
  getCountries() {
    this.getCountryHeader = new HttpHeaders().set(
      'Authorization',
      this.myLoginToken
    );

    return this.http.get(
      'https://taskfrontendapi.azurewebsites.net/api/country',
      {
        headers: this.getCountryHeader,
      }
    );
  }
  // Add Country
  AddCountry(Country: any) {
    this.getCountryHeader = new HttpHeaders().set(
      'Authorization',
      this.myLoginToken
    );

    return this.http.post(
      'https://taskfrontendapi.azurewebsites.net/api/country',
      Country,
      {
        headers: this.getCountryHeader,
      }
    );
  }

  editCountry(country: any) {
    debugger;
    this.getCountryHeader = new HttpHeaders().set(
      'Authorization',
      this.myLoginToken
    );

    return this.http.put(
      `https://taskfrontendapi.azurewebsites.net/api/country`,
      country,
      {
        headers: this.getCountryHeader,
      }
    );
  }

  deleteCountry(id: any) {
    this.getCountryHeader = new HttpHeaders().set(
      'Authorization',
      this.myLoginToken
    );

    return this.http.delete(
      `https://taskfrontendapi.azurewebsites.net/api/country/${id}`,
      {
        headers: this.getCountryHeader,
      }
    );
  }
}
