import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage/storage.service';
import { RouteControlService } from '../service/router-control/route-control.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  UserName: string = 'User_Name'
  userFound: boolean = false
  constructor(private storage: StorageService, public rc: RouteControlService,
    private route:Router){

  }

  ngOnInit(): void {
      this.UserName = this.storage.popLocal('username')!= null ? this.storage.popLocal('username') : this.storage.popSession('username');
      if(this.UserName != 'User_Name' && this.UserName != null){
        this.userFound =  true
      }
      else{
        this.userFound = false
      }
  }

  logout(): void{
    localStorage.clear()
    sessionStorage.clear()
    this.userFound = false
    this.UserName = 'User_Name'
    window.location.reload()
    this.route.navigate(['/home'])
  }
}
