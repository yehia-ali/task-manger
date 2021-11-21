import { Subscription } from 'rxjs';
import { CountryService } from './country.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  countries: any[] = [];
  getAllCountriesSubscription!: Subscription;
  DeleteCountriesSubscription!: Subscription;
  wantedCountryToDelete = '';
  wantedCountryIdToDelete: number = 0;
  @ViewChild('closeModal') private closeModal: any;

  constructor(
    private CountryService: CountryService,
    private toastr: ToastrService
  ) {}
  getAllCountries() {
    this.getAllCountriesSubscription =
      this.CountryService.getCountries().subscribe(
        (res: any) => {
          this.countries = res;
          debugger;
          console.log(this.countries);
        },
        (err: any) => {
          this.toastr.error(err);
        }
      );
  }
  DeleteCountry(id: any) {
    this.DeleteCountriesSubscription = this.CountryService.deleteCountry(
      id
    ).subscribe(
      (res: any) => {
        console.log('delete res', res);
        let wantedidex = this.countries.findIndex((el) => el.id === id);
        this.countries.splice(wantedidex, 1);
        this.toastr.success('deleted');
      },

      (err: any) => {
        this.toastr.success(err);
      }
    );
  }
  EditCountry(country: any) {
    this.wantedCountryToDelete = country.name;
    this.wantedCountryIdToDelete = country.id;
  }
  onSaveEditCountry() {
    this.DeleteCountriesSubscription = this.CountryService.editCountry({
      Id: this.wantedCountryIdToDelete,
      Name: this.wantedCountryToDelete,
    }).subscribe(
      (res: any) => {
        console.log('Edited res', res);
        let wantedidex = this.countries.findIndex(
          (el) => el.id === this.wantedCountryIdToDelete
        );

        this.countries[wantedidex] = res;
        this.closeModal.nativeElement.click();
        this.toastr.success('Success');
      },

      (err: any) => {
        console.log(err);
        this.toastr.error(err);
      }
    );
  }
  ngOnInit(): void {
    this.getAllCountries();
  }
}
