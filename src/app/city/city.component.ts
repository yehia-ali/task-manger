import { CountryService } from './../country/country.service';
import { Subscription } from 'rxjs';
import { CityService } from './city.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
})
export class CityComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  Cities: any[] = [];
  getAllCitiesSubscription!: Subscription;
  DeleteCitiesSubscription!: Subscription;
  getAllCountriesSubscription!: Subscription;
  countries!: any[];
  wantedCityToDelete = '';
  wantedCityIdToDelete: number = 0;
  @ViewChild('closeModal') private closeModal: any;
  selectedCountryId = '';

  constructor(
    private CityService: CityService,
    private CountryService: CountryService,
    private toastr: ToastrService
  ) {
    this.countries = [];
  }
  getAllCountries() {
    this.getAllCountriesSubscription =
      this.CountryService.getCountries().subscribe(
        (res: any) => {
          this.countries = res;
          debugger;
          console.log(this.countries);
        },
        (err: any) => {
          console.log(err);
        },
        () => {
          this.getAllCities();
        }
      );
  }

  getAllCities() {
    this.getAllCitiesSubscription = this.CityService.getCities().subscribe(
      (res: any) => {
        this.Cities = res;
        this.Cities.map((city) => {
          this.countries.find((country) => {
            if (country.id == city.countryId) {
              city.countryName = country.name;
            }
          });
        });
        console.log(this.Cities);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  DeleteCity(id: any) {
    this.DeleteCitiesSubscription = this.CityService.deleteCity(id).subscribe(
      (res: any) => {
        console.log('delete res', res);
        let wantedidex = this.Cities.findIndex((el) => el.id === id);
        this.Cities.splice(wantedidex, 1);
        debugger;
        this.toastr.success('Deleted City');
      },

      (err: any) => {
        this.toastr.error('error when delete item');
      }
    );
  }
  EditCity(City: any) {
    this.wantedCityToDelete = City.name;
    this.wantedCityIdToDelete = City.id;
    this.selectedCountryId = City.countryId;
  }
  clearInputsAndCloseModal() {
    this.wantedCityToDelete = '';
    this.wantedCityIdToDelete = 0;
    this.selectedCountryId = '';

    this.closeModal.nativeElement.click();
  }

  onSaveEditCity() {
    this.DeleteCitiesSubscription = this.CityService.editcity({
      Id: this.wantedCityIdToDelete,
      Name: this.wantedCityToDelete,
      CountryId: +this.selectedCountryId,
    }).subscribe(
      (res: any) => {
        console.log('Edited res', res);
        let wantedidex = this.Cities.findIndex(
          (el) => el.id === this.wantedCityIdToDelete
        );
        this.countries.find((c) => {
          if (c.id == this.selectedCountryId) {
            res.countryName = c.name;
          }
        });
        this.toastr.success('Success Edit');
        this.Cities[wantedidex] = res;
        this.clearInputsAndCloseModal();
      },

      (err: any) => {
        console.log(err);
        this.toastr.error('error in save');
      }
    );
  }
  ngOnInit(): void {
    this.getAllCountries();
  }
}
