import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouteControlService } from '../service/router-control/route-control.service';
import { HashService } from '../service/hashing/hash.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor( private http: HttpClient, private rc:RouteControlService, 
    private route: Router, private hash: HashService){

  }

  signUpData = {
    "username": '',
    "mail": '',
    "password":""
    }

  submit: boolean = false

  loader: boolean = false

  userFound: boolean = false
  
  passConditionShow: boolean = false

  passCond = {
    l: false,
    u: false,
    n: false,
    s: false,
    len: false
  }

  regexEmail: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  ValidatePass(): void{
      
    this.passCond.l = /[a-z]/.test(this.signUpData.password)
    this.passCond.u = /[A-Z]/.test(this.signUpData.password)
    this.passCond.n = /[0-9]/.test(this.signUpData.password)
    this.passCond.s = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(this.signUpData.password)
    this.passCond.len = this.signUpData.password.length >= 8 ? true : false
    
  }

  all(obj: any):boolean{
    for(let key in obj){
      if(!obj[key]){
        return false
      }
    }
    return true
  }

    signup(): any{
      console.log('API called')
      this.loader = true
      this.http.post(`https://server-pmnj.onrender.com/api/register`, {
        'user': this.signUpData.username,
        'pass': this.hash.hashPassword(this.signUpData.password),
        'mail': this.signUpData.mail
      })
      .subscribe( (data: any) => {
        this.loader = false
        this.passConditionShow = false
        console.log(data)
        if( data['status']['statusCode']=='409'){
          this.userFound = true
        }
        else{
          this.rc.flag.regToSuccess = true
          this.rc.flag.regToLog = true
          this.rc.userData.email = this.signUpData.mail
          this.route.navigate(['/success'])
        }
      })

      }
}

