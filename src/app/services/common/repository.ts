import { IRepository } from "./irepository";
import { Observable } from "rxjs";
import { AppConstants } from "../../app-constants";
import { HttpClient } from "@angular/common/http";
import { ResultMessage } from "../../models/result-message";
import { NgModule } from "@angular/core";

@NgModule()//Dependecy Olcauğı için ngModule bilgisi şart oluyor.
export class Repository implements IRepository{
    private  _apiUrl: string;
    constructor(private _http: HttpClient) {
    }

    /**Hangi Apinin kullanılması isteniyorsa burda set edilmeli.Örnek:"tag"  */
    setApiUrl(ApiParameter: string){
        this._apiUrl = AppConstants.ServerWithApiUrl + ApiParameter;
    }

    getAll<T>(): Observable<T> {
        return this._http.get<T>(this._apiUrl);
    }

    insert<T>(model: T): Observable<ResultMessage> {
        return this._http.post<ResultMessage>(this._apiUrl, model);
    }

    update<T>(model: T): Observable<ResultMessage> {
        return this._http.put<ResultMessage>(this._apiUrl, model);
    }

    delete<T>(id: number): Observable<ResultMessage> {
        return this._http.delete<ResultMessage>(this._apiUrl + `/${id}`);
    }


}
