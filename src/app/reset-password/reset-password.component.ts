import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HashService } from '../service/hashing/hash.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit{

  constructor( private ar: ActivatedRoute, private http: HttpClient,
    private hash: HashService, private route: Router){

  }

  submit: boolean = false

  passConditionShow: boolean = false

  newPassword = ''

  confirmPassword = ''

  cpFlag: boolean = false

  token: string = ''

  ngOnInit(): void {
      this.ar.queryParams.subscribe( params => {
        this.token = params['token']
        this.http.get(`https://server-pmnj.onrender.com/api/verifytoken?token=${params['token']}`)
        .subscribe( (data: any) => {
          if(!data['status']){
            alert("Token expired!!! Please make an another request.\nThank you!")
            window.close()
          }
        } )
      })
  }

  passCond = {
    l: false,
    u: false,
    n: false,
    s: false,
    len: false
  }

  regexEmail: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  ValidatePass(): void{
      
    this.passCond.l = /[a-z]/.test(this.newPassword)
    this.passCond.u = /[A-Z]/.test(this.newPassword)
    this.passCond.n = /[0-9]/.test(this.newPassword)
    this.passCond.s = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(this.newPassword)
    this.passCond.len = this.newPassword.length >= 8 ? true : false
    
  }

  updatePassword(): void{
    this.http.post("https://server-pmnj.onrender.com/api/resetpassword", {
      'token': this.token,
      'password': this.hash.hashPassword(this.newPassword)
    }).subscribe( (data: any) => {
      if(data['status']==0){
        alert('Server error.\nPlease try again.')
      }
      else if(data['status'] == 2){
        alert("Token expired!!! Please make an another request.\nThank you!")
      }
      else{
        alert('Password successfully updated!!!\nRedirecting to login.')
        this.route.navigate(['/signin'])
      }
    } )
  }

}
