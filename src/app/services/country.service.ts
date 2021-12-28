import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor( private http: HttpClient ) { }

  getCountries(){
    return this.http.get('https://restcountries.com/v2/all').pipe(
      map((resp:any) => {
        return resp.map((country: { name: any; alpha3Code: any; }) => {
          return {
            name: country.name,
            code: country.alpha3Code
          }
        })
      })
    )
  }
}
