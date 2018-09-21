import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Repository } from './common/repository';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _apiUrl: string;
  //Repository de yapısında bir yanlışlık var düzeltilecek.
  constructor(private _http: HttpClient, private _baseRepository: Repository) {
    // this._baseRepository.setApiUrl("User");
    this._apiUrl = AppConstants.ServerWithApiUrl + "User";
  }

  getToUser(id: number): Observable<User> {
    return this._http.get<User>(this._apiUrl+"/"+id.toString());
  }
}
