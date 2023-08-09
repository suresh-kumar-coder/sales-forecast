import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouteControlService } from '../service/router-control/route-control.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent{

  constructor( private http: HttpClient, public rc: RouteControlService, private route: Router){

  }

  submit: boolean = false

  loader1: boolean = false
  loader2: boolean = false

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
        this.stopCountdown();
      }
    }, 1000);
  }

  stopCountdown(): void {
    clearInterval(this.timer);
    this.otpTimeOut = 120;
  }

  sendOtp(flag: string = ''): any{
    
    if(flag=='r'){
      this.rc.flag.otpsent=false
      this.otpTimeOut = 120
    }

      this.loader1 = true;
      this.http.get(`https://server-pmnj.onrender.com/api/forgotpassword?mail=${this.userData.mail}`)
      .subscribe( (data: any) =>{
      this.loader1 = false
      if(data['status']['statusCode'] == 'UNF'){
        this.userNotFound = true
      }
      else if(data['status']['statusCode'] == '500'){
        alert("Server is not responding. Please try again!!!")
      }
      else{
        this.userNotFound = false
        this.rc.flag.otpsent = true
        this.countDown()
      }
    } )
  }

  verifyOtp(): void{
    this.loader2 = true
    this.http.post(`https://server-pmnj.onrender.com/api/otpverify?mail=${this.userData.mail}&otp=${this.userData.otp}`, {
      "url": window.location.href
    })
      .subscribe( (data: any) => {
        this.loader2 = false
        console.log(data)
        if(data['status']['statusCode'] == "ONM"){
          alert("OTP not matching. Please try again.")
          this.userData.otp = ''
        }
        else if(data['status']['statusCode'] == "OE"){
          alert("OTP Expired. Please try again.")
          this.userData.otp = ''
        }
        else{
          alert("OTP is successfully verified.\n\nCheck your mail for url to reset your password.")
          this.rc.flag.otpsent = false
          this.rc.flag.otpverified = false
          this.route.navigate(['/signin'])
        }
      } )
  }

}
