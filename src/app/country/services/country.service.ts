import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interface/country.interface';
import { Observable, of, tap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  private baseUrl: string = 'https://restcountries.com/v3.1';

  private _regions: Region[] = [
    Region.Africa,
    Region.Americas,
    Region.Asia,
    Region.Europe,
    Region.Oceania,
  ];

  public get regions(): Region[] {
    //Asi mato la referencia a el arreglo original, pro si alguien modifica la region no me afecte el original
    return [...this._regions];
  }

  public getCountriesByRegion(region: Region): Observable<SmallCountry[]> {
    if (!region) return of([]);
    const url = `${this.baseUrl}/region/${region}/?fields=cca3,name,borders`;
    return this.http.get<Country[]>(url).pipe(
      map((country) =>
        country.map((coun) => ({
          name: coun.name.common,
          cca3: coun.cca3,
          borders: coun.borders ?? [],
        }))
      )
    );
  }

  public getCountriesByAlphaCode(alphaCode: string): Observable<SmallCountry> {
    if (!alphaCode) return of();
    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
    return this.http.get<Country>(url).pipe(
      map((country) => {
        console.log(country);
        return {
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? [],
        };
      })
    );
  }
}
