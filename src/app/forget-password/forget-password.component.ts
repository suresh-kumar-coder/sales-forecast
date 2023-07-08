import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouteControlService } from '../service/router-control/route-control.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {


  constructor( private http: HttpClient, public rc: RouteControlService){

  }

  submit: boolean = false

  loader: boolean = false

  userNotFound: boolean = false

  otpTimeOut = 120
  timer: any

  userData = {
    mail : '',
    password : '',
    otp: ''
  }


  countDown(): void{
    this.timer = setInterval(() => {
      if (this.otpTimeOut > 0) {
        this.otpTimeOut--;
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  sendOtp(flag: string = ''): any{
    this.loader = true
    
    if(flag=='r'){
      this.rc.flag.otpsent=false
      this.otpTimeOut = 120
    }

    if(this.rc.flag.otpsent){
      this.http.get(`http://localhost:5000/api/otpv?mail=${this.userData.mail}.com&otp=${this.userData.otp}`)
      .subscribe( (data: any) => {
        this.loader = false
        if(data['status']['statusCode'] == '0'){
          console.log('Not Match')

        }
        else{
          console.log('Match')
        }
      } )
    }
    else{
      this.http.get(`http://localhost:5000/api/forgot?mail=${this.userData.mail}`)
      .subscribe( (data: any) =>{
      this.loader = false
      if(data['status']['statusCode'] == '0'){
        this.userNotFound = true
      }
      else{
        this.userNotFound = false
        this.rc.flag.otpsent = true
        console.log('OTP sent')
        this.countDown()
      }
    } )
    }
  }

}
