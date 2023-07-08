import { Component, OnInit } from '@angular/core';
import { RouteControlService } from '../service/router-control/route-control.service';
import { StorageService } from '../service/storage/storage.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private rc: RouteControlService, private st: StorageService, private http: HttpClient){}

  userFound: boolean = false

  email:string = ''

  newsloader: boolean = false

  ngOnInit(): void {
      this.rc.currentPage = 'h'
      this.userFound = this.st.popLocal('token') != null || this.st.popSession('token') != null
        console.log(this.userFound)
      this.http.post("https://server-pmnj.onrender.com/api/register?user=suresh&pass=kumar&mail=sk3235516@gmail.com", null)
        .subscribe( (data: any)=>{
          console.log("Connected to server")
        })
      
  }
  newsletter():void{
    this.newsloader = true
    this.http.get(`https://server-pmnj.onrender.com/api/newsletter?mail=${this.email}`)
    .subscribe( (data: any) => {
      console.log(data)
      this.newsloader = false
    } )
  }
}
