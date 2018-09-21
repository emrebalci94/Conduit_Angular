import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _tokenService:TokenService,
    private _router:Router
  ){}
  canActivate():boolean{
    let isLoggin=this._tokenService.HasLogin();
    if(isLoggin){
      return true;
    }
    else {
      this._router.navigate(["/Login"]);
      return false;
    }

    
  } 
}
