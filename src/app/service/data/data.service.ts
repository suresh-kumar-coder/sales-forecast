import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }
  userData = {
    mail: "",
    userName: '',
    password: ''
  }

  predData = {
  }

  predDataIsEmpty: boolean = true

  pushPredData(data: any): void{
    this.predData = data
    this.predDataIsEmpty = false
  }

  popPredData(): any{
    return this.predData
  }
}
