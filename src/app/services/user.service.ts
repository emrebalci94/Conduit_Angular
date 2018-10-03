import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Repository } from './common/repository';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AppConstants } from '../app-constants';
import { ResultMessage } from '../models/result-message';

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
        const headers = new HttpHeaders({
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        });

        return this._http.get<User>(this._apiUrl + "/" + id.toString(), { headers: headers });
    }

    updateProfile(user: User): Observable<ResultMessage> {
        return this._http.put<ResultMessage>(this._apiUrl, user);
    }

    updateToProfileImage(file: File): Observable<ResultMessage> {
        if (file) {
            const formData = new FormData();
            formData.append(file.name, file);
            const headers = new HttpHeaders({
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            });

            return this._http.post<ResultMessage>(this._apiUrl + "/uploadtoimage", formData, { headers: headers, reportProgress: true });
        }
        return null;
    }
}
