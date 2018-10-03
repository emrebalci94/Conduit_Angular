import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { TokenService } from '../token.service';
import { ToastrService } from 'ngx-toastr';
import { RouteService } from '../route.service';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private injector: Injector) { }
  handleError(error: any): void {
    // debugger;
    const _toastrService = this.injector.get(ToastrService);
    const _tokenService = this.injector.get(TokenService);
    const _routerService = this.injector.get(Router);

    // console.log(error.toString());
    switch (error.status) {
      case 401:
        _tokenService.Remove();
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        // _routerService.navigate(["/Register"]);
        // setTimeout(()=> _toastrService.error("Kullanıcı adı veya şifre yanlış.", "Uyarı"));
        // _routerService.navigate(["/"]);
        setTimeout(() => _toastrService.error("Kullanıcı girişi başarısız", "Hata"));
        _routerService.navigateByUrl('./')
        // this._router.navigate(["/Login"]);
        break;
      case 400:
      console.log(error);
        setTimeout(() => _toastrService.error("İlgili istek sonuçsuz kaldı", "Hata"));
        // _routerService.navigateByUrl('./')


        //  location.replace("/");
        break;
      default:
        //, private _toastrService: ToastrService
        // _routerService.navigate(["/"]);
        setTimeout(() => _toastrService.error(error.toString(), "Hata"));
        break;
    }

    //  throw error;
  }


}
