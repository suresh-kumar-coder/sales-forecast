import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FormsModule } from '@angular/forms';
import { SuccessComponent } from './success/success.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ForecastComponent } from './forecast/forecast.component';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import { AccessDenyComponent } from './access-deny/access-deny.component';
import { HomeComponent } from './home/home.component';
import * as plotly from 'plotly.js-dist-min';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    DashboardComponent,
    ErrorPageComponent,
    SuccessComponent,
    ForgetPasswordComponent,
    NavbarComponent,
    ForecastComponent,
    AccessDenyComponent,
    HomeComponent,
    ResetPasswordComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PlotlyModule,
    ChartModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
