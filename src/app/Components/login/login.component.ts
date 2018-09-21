import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _authService: AuthserviceService,
    private _tokenService: TokenService,
    private _router: Router,
    private _toastrService:ToastrService
  ) { }

  loginModel = { username: "", password: "" }

  ngOnInit() {
  }

  Login() {
    this._authService.Login(this.loginModel).subscribe(p => {
      // console.log(p);
      localStorage.setItem("userId", p.userId);
      localStorage.setItem("userName", p.userName);
      this._tokenService.Save(p.token);
      this._router.navigate(["/"]);
    },err=> { 
      if(err.status==401){
        setTimeout(()=> this._toastrService.warning("Kullanıcı adı veya şifre yanlış.", "Uyarı"));
      }
      throw err;});
  }
}
