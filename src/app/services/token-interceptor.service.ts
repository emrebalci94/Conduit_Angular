import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
// Bununla Http isteği gitmeden önce headers ekleyebiliyoruz. Fakat HttpClient ile bu problem giderilmiş yani interceptor eski bir yapı. Daha fazlası için araştır.
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _tokenService:TokenService) { }
  intercept(req, next) {
    let token=this._tokenService.Get();
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(tokenizedReq);
  }
}
