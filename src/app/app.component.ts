import { Component } from '@angular/core';
import { AuthserviceService } from './services/authservice.service';
import { RouteService } from './services/route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _authService:AuthserviceService,private _routerService:RouteService){}
  title = 'app';
  Logout(){
      this._authService.Logout();
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      this._routerService.GoToUrl("/");
  }
}

