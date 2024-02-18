import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouteControlService } from '../service/router-control/route-control.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-deny',
  templateUrl: './access-deny.component.html',
  styleUrls: ['./access-deny.component.scss']
})
export class AccessDenyComponent implements OnInit, OnDestroy{
  constructor(private rc: RouteControlService, private route: Router){}

  ngOnInit(): void {
      if(!this.rc.flag.dashToAd){
        this.route.navigate(['/home'])
      }
  }
  ngOnDestroy(): void {
      this.rc.flag.dashToAd = false
  }
}
