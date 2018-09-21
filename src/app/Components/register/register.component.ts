import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SingOrLoginUser } from '../../models/user';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _registerService: RegisterService,
    private _toastr: ToastrService,
    private _router: Router) {
  }

  registerModel = new SingOrLoginUser();

  ngOnInit() {

  }

  Register() {
    this._registerService.register(this.registerModel).subscribe(p => {
      if (p.errors != null) {
        this._toastr.error(p.errors.message, p.errors.code.toString()).onHidden.subscribe(p =>  { this.registerModel.password = null });
      }
      else {
        
        this._toastr.success("Kayıt işlemi başarılı.", null).onHidden.subscribe(p =>  {this._router.navigate(["/Login"]); });
      }
    });
  }
}
