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
    const _toastrService=this.injector.get(ToastrService);
    const _tokenService=this.injector.get(TokenService);
    // const _routerService = this.injector.get(Router);
    // console.log(error.toString());
    switch (error.status) {
      case 401:
        _tokenService.Remove();
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        // _routerService.navigate(["/Register"]);
        // setTimeout(()=> _toastrService.error("Kullanıcı adı veya şifre yanlış.", "Uyarı"));

        // this._router.navigate(["/Login"]);
        break;

      default:
      //, private _toastrService: ToastrService
        setTimeout(()=> _toastrService.error(error.toString(), "Hata"));
        break;
    }

    //  throw error;
  }


}
