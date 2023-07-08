import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  
  pushLocal(key: any, value: any): void{
    localStorage.setItem(key, value)
  }

  pushSession(key: any, value: any): void{
    sessionStorage.setItem(key, value)
  }

  popLocal(key: any): any{
    return localStorage.getItem(key)
  }

  popSession(key: any): any{
    return sessionStorage.getItem(key)
  }
  
  canAccess(): any{
    if( this.popLocal('token')!= null || this.popSession('token')!= null){
      return true
    }
    else{
      return false
    }
  }

}
