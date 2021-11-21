import { CountryService } from './../../country/country.service';
import { CityService } from './../city.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css'],
})
export class AddCityComponent implements OnInit {
  addCitySubscription!: Subscription;
  getAllCountriesSubscription!: Subscription;
  City!: string;
  isLoadingAddCity!: boolean;
  @Input() cities: any[] = [];
  @Input() countries: any[] = [];
  selectedCountryId!: any;
  @ViewChild('closeModal') private closeModal: any;

  constructor(
    private CityService: CityService,
    private toastr: ToastrService
  ) {}

  clearInputsAndCloseModal() {
    this.City = '';
    this.selectedCountryId = '';
    this.closeModal.nativeElement.click();
  }

  AddCity() {
    this.addCitySubscription = this.CityService.AddCity({
      Name: this.City,
      CountryId: +this.selectedCountryId,
    }).subscribe(
      (res: any) => {
        console.log('added City ', res);
        this.countries.find((c) => {
          if (c.id == this.selectedCountryId) {
            res.countryName = c.name;
          }
        });
        this.cities.push(res);
        this.clearInputsAndCloseModal();
        this.toastr.success('Success Add');
      },
      (err: any) => {
        this.toastr.error('error in add');
      }
    );
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.addCitySubscription?.unsubscribe();
  }
}
