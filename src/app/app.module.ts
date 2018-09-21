import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ListComponent } from './Components/list/list.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './services/guards/auth.guard';
import { TokenService } from './services/token.service';
import { RouteService } from './services/route.service';
import { TagService } from './services/tag.service';
import { AuthserviceService } from './services/authservice.service';
import { ProfileComponent } from './Components/profile/profile.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { IRepository } from './services/common/irepository'
import { Repository } from './services/common/repository';
import { ArticleComponent } from './Components/Common/article/article.component';
import { TagComponent } from './Components/Common/tag/tag.component';
import { TagsComponent } from './Components/tags/tags.component';
import { GlobalErrorHandlerService } from './services/handlers/global-error-handler.service';
import { UserService } from './services/user.service';
import { ArticleService } from './services/article.service';
import { RegisterService } from './services/register.service';

import {ToastrModule} from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ArticleDetailComponent } from './Components/article-detail/article_detail.component';
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    Repository,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressAnimation: "increasing",
      progressBar: true,
      easing: "ease-in-out-quad"
    }),
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ListComponent,
    ProfileComponent,
    ArticleComponent,
    TagComponent,
    TagsComponent,
    ArticleDetailComponent,
  ],
  // HTTP_INTERCEPTORS lı olan json: Guard ile kontrol edilen bir yere istek atıldığında çalışır.
  providers: [AuthGuard, TokenService,  TagService, AuthserviceService, UserService, ArticleService, RegisterService, RouteService,
    {
      multi: true,
      useClass: TokenInterceptorService,
      provide: HTTP_INTERCEPTORS
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
