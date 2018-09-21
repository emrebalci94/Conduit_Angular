import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ListComponent } from './Components/list/list.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { AuthGuard } from './services/guards/auth.guard';
import { ProfileComponent } from './Components/profile/profile.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'Index', component: DashboardComponent },
  // { path: "List", component: ListComponent },
  { path: "Register", component: RegisterComponent },
  { path: "Login", component: LoginComponent },
  { path: "Profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "**", component: DashboardComponent }//404 not found sayfasına yönlendirme yapılabilir.

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
