import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SuccessComponent } from './success/success.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ForecastComponent } from './forecast/forecast.component';
import { AccessDenyComponent } from './access-deny/access-deny.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:"signin", component: SigninComponent},
  { path:"", redirectTo: "/home", pathMatch: 'full'},
  {path:"signup", component: SignupComponent},
  {path:'success', component: SuccessComponent},
  {path:"forecast", component: ForecastComponent},
  {path:"dashboard", component: DashboardComponent},
  {path:"pagenotfound404", component: ErrorPageComponent},
  {path:"forgot-password", component: ForgetPasswordComponent},
  {path:'nav', component: NavbarComponent},
  {path:'accessdenied', component: AccessDenyComponent},
  {path:'home', component: HomeComponent},
  { path:"**", redirectTo: "/pagenotfound404", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
