import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ListComponent } from './Components/list/list.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { AuthGuard } from './services/guards/auth.guard';
import { ProfileComponent } from './Components/profile/profile.component';
import { ArticleDetailComponent } from './Components/article-detail/article_detail.component';
import { NewArticleComponent } from './Components/new-article/new-article.component';
import { EditArticleComponent } from './Components/edit-article/edit-article.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'Index', component: DashboardComponent },
  // { path: "List", component: ListComponent },
  { path: "Register", component: RegisterComponent },
  { path: "Login", component: LoginComponent },
  { path: "Article/:slug", component: ArticleDetailComponent },
  { path: "NewArticle/:tag", component: NewArticleComponent, canActivate: [AuthGuard] },
  { path: "NewArticle", component: NewArticleComponent, canActivate: [AuthGuard] },//boş parametresizde gelebilir parametreli gelirse otomatik tag alanını doldurucaz.
  { path: "EditArticle/:tag", component: EditArticleComponent, canActivate: [AuthGuard] },
  { path: "Profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "**", redirectTo: '' }//404 not found sayfasına yönlendirme yapılabilir.

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{onSameUrlNavigation:"reload"})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
