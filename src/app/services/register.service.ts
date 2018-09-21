import { Injectable } from '@angular/core';
import { Repository } from './common/repository';
import { SingOrLoginUser } from '../models/user';
import { Observable } from 'rxjs';
import { ResultMessage } from '../models/result-message';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _baseRepository:Repository) { this._baseRepository.setApiUrl("user"); }

  register(model:SingOrLoginUser):Observable<ResultMessage>{
    return this._baseRepository.insert(model);
  }
}
