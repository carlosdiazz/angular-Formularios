import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Region, SmallCountry } from '../../interface/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-pages',
  templateUrl: './selector-pages.component.html',
  styles: ``,
})
export class SelectorPagesComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private countryServices: CountryService
  ) {}
  public myForm: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    border: ['', [Validators.required]],
  });
  public countriesByRegion: SmallCountry[] = [];
  public borders: string[] = [];

  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChanged();
  }

  public onRegionChanged(): void {
    this.myForm
      .get('region')
      ?.valueChanges.pipe(
        tap(() => this.myForm.get('country')?.setValue('')),
        tap(() => (this.borders = [])),
        switchMap((region) => {
          return this.countryServices.getCountriesByRegion(region);
        })
      )
      .subscribe((countries) => {
        this.countriesByRegion = countries;
      });
  }

  get regions(): Region[] {
    return this.countryServices.regions;
  }

  onCountryChanged(): void {
    this.myForm
      .get('country')
      ?.valueChanges.pipe(
        tap(() => this.myForm.get('border')?.setValue('')),
        filter((value: string) => value.length > 0),
        switchMap((alphaCode) => {
          return this.countryServices.getCountriesByAlphaCode(alphaCode);
        })
      )
      .subscribe((borders) => {
        console.log({ borders });
        this.borders = borders.borders;
      });
  }
}
