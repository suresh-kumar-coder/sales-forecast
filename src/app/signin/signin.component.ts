import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouteControlService } from '../service/router-control/route-control.service';
import { Router } from '@angular/router';
import { StorageService } from '../service/storage/storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy{
  
  constructor( private http: HttpClient, private rc:RouteControlService,
     private route: Router, private storage: StorageService){

  }

  ngOnInit(): void {
      if(this.rc.flag.regToLog){
        this.signInData.mail = this.rc.userData.email
      }
  }

  ngOnDestroy(): void {
    this.rc.userData.email = ''
  }

  signInData = {
    "mail": '',
    "password":""
    }

  submit: boolean = false

  loader: boolean = false

  userNotFound: boolean = false

  passIncorrect: boolean = false
  
  regexEmail: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  rememberMe: boolean = true

  signIn(): any{
    this.loader = true
    this.http.post(`https://server-pmnj.onrender.com/api/auth`, {
     "mail" : this.signInData.mail,
     "pass" : this.signInData.password
    })
    .subscribe( (data: any) => {
      this.loader = false
      console.log(data)
      if( data['status']['statusCode']=='403'){
        this.userNotFound = true
        this.passIncorrect = false
      }
      else if( data['status']['statusCode']=='405'){
        this.userNotFound = false
        this.passIncorrect = true
      }
      else{
        this.userNotFound = false
        this.rc.flag.logToSuccess = true
        this.storeData(data)
        this.route.navigate(['/success'])
      }
    })

    }

    storeData(data: any){
      localStorage.clear()
      sessionStorage.clear()
      if(this.rememberMe){
        this.storage.pushLocal('token', data['data']['token'])
        this.storage.pushLocal('username', data['data']['username'])
        this.storage.pushLocal('mail', data['data']['mail'])
      }
      else{
        this.storage.pushSession('token', data['data']['token'])
        this.storage.pushSession('username', data['data']['username'])
        this.storage.pushSession('mail', data['data']['mail'])
      }
    }
      
}
