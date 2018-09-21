import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Repository } from './common/repository';
import { Tag } from '../models/tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient, private _baseRepository: Repository) {
    this._baseRepository.setApiUrl("tag");
  }


  public GetAll(): Observable<Tag[]> {
    return this._baseRepository.getAll<Tag[]>();
  }
}
