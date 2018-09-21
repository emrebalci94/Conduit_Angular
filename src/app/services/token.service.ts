import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public Save(token){
    localStorage.setItem("token",token);
  }

  public Get():string{
    return localStorage.getItem("token");
  }

  public HasLogin():boolean {
    return !!this.Get();
  }

  public Remove(){
    return localStorage.removeItem("token");
  }
}
