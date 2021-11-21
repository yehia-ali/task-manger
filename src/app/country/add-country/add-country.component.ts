import { CountryService } from './../country.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css'],
})
export class AddCountryComponent implements OnInit {
  addCountrySubscription!: Subscription;
  Country!: string;
  isLoadingAddCountry!: boolean;
  @Input() countries!: any[];
  @ViewChild('closeModal') private closeModal: any;

  constructor(
    private CountryService: CountryService,
    private toastr: ToastrService
  ) {
    this.countries = [];
  }

  AddCountry() {
    this.isLoadingAddCountry = true;

    this.addCountrySubscription = this.CountryService.AddCountry({
      Name: this.Country,
    }).subscribe(
      (res: any) => {
        this.isLoadingAddCountry = false;
        this.Country = '';
        this.countries.push(res);
        this.closeModal.nativeElement.click();
        this.toastr.success('added');
      },
      (err: any) => {
        this.toastr.error('adding Country error');
      }
    );
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.addCountrySubscription?.unsubscribe();
  }
}
