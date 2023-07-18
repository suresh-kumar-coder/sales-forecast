import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class HashService {

  constructor() { }

  hashPassword(str: string): string{
    return CryptoJS.SHA256(str).toString()
  }
}
