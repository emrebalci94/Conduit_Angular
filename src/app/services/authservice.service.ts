import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private loginUrl="http://192.168.1.57/api/Token/Login";
  constructor(private http: HttpClient,private _tokenService:TokenService) { }

  public Login(user:any):any{
    return this.http.post(this.loginUrl,user);
  }

  public Logout(){
    this._tokenService.Remove();
  }
}
