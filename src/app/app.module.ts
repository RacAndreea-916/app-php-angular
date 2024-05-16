import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewLogsComponent } from './view-logs/view-logs.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { UserLogsComponent } from './user-logs/user-logs.component';
import { logsAuthInterceptor } from './logs-auth.interceptor';
import { FilteredLogsComponent } from './filtered-logs/filtered-logs.component';
import { AddLogComponent } from './add-log/add-log.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewLogsComponent,
    PaginationComponent,
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    UserLogsComponent,
    FilteredLogsComponent,
    AddLogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
