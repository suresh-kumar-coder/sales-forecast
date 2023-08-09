import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteControlService {

  flag = {
    regToSuccess : false,
    logToSuccess : false,
    regToLog : false,
    otpsent: false,
    otpverified: false,
    dashToAd: false
  }

  currentPage: string = ''

  userData = {
    email: ''
  }
  constructor() { }
}
