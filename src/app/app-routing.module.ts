import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewLogsComponent } from './view-logs/view-logs.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { UserLogsComponent } from './user-logs/user-logs.component';
import { AuthGuardService } from './services/auth-guard.service';
import { FilteredLogsComponent } from './filtered-logs/filtered-logs.component';
import { AddLogComponent } from './add-log/add-log.component';

const routes: Routes = [
  {path: 'app-view-logs', component:ViewLogsComponent},
  {path: 'app-home', component:HomeComponent},
  {path: 'app-logout', component:LogoutComponent},
  {path: 'app-user-logs', component:UserLogsComponent},
  {path: 'app-filtered-logs', component:FilteredLogsComponent},
  {path: 'app-add-log', component:AddLogComponent},
  {path: 'app-login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
