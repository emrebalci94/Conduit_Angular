import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private _route:Router) { }

  public GoToUrl(url:string){
    this._route.routeReuseStrategy.shouldReuseRoute=()=>{return false}; // eğer aynı url isteği gelirse refresh yapar.
    this._route.navigate([url]);

  }
}
