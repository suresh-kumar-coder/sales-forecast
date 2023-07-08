import { HttpClient } from '@angular/common/http';
import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { DataService } from '../service/data/data.service';
import { Router } from '@angular/router';
import { StorageService } from '../service/storage/storage.service';
import { RouteControlService } from '../service/router-control/route-control.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit{
  constructor( private http: HttpClient, private dataTransfer: DataService,
     private route: Router, private storage: StorageService, private rc: RouteControlService){

  }


  ngOnInit(): void {
    if(this.storage.popSession('token')==null && this.storage.popLocal('token')==null){
      this.rc.flag.dashToAd = true
      this.route.navigate(['/accessdenied'])
    }
    this.rc.currentPage = 'f'
  }

  

  number:Array<any> = []

  help: boolean = false

  fdata: any = {
    file: false,
    target: '',
    ti: '',
    tc: null
  }

  fbtnLoader: boolean = false

  displayString: string = 'Drag & Drop'
  f: any
  file = {
    name: '',
    size: ''
  }
  loader: Array<boolean> = [false, false]
  arr: Array<any> = []

  url: string = ''

  mail: string = ''

  data = new FormData();
  
  submit: boolean = false

  dragOver(event: DragEvent) {
    event.preventDefault()
    this.displayString = 'Release to upload'
  }

  dragLeave(event: DragEvent): void{
    event.preventDefault()
    this.displayString = 'Drag & Drop'
  }

  drop(event: DragEvent): void{
    event.preventDefault()
    this.displayString = 'Drag & Drop'
    const files = event.dataTransfer?.files;
    if (files && files.length) {
      this.f = files[0];
      if(this.f.type === 'text/csv'){
        this.file.name = this.f.name
        this.file.size =  this.sizeConversion(this.f.size)

      }
      
      else{
        alert("Invalid file type! Please Upload a CSV file.")
      }
      // console.log(this.f)
    }
  }

  uploadThruIp(event: Event): void{
    this.f = (event.target as HTMLInputElement).files?.[0];
    if (this.f) {
      this.file.name = this.f.name
      this.file.size =  this.sizeConversion(this.f.size)
      // console.log(this.f)
    }
  }

  sizeConversion(n: any): any{
    if(n>1000 && n<1000000){
      n /= 1024
      return Math.floor(n)+'KB'
    }
    else{
      n /= 1048576
      return Math.floor(n)+'MB'
    }
  }

  upload(i: any): void{
    if(i==0){
      this.loader[0] = true
      this.arr = []
      this.data.delete('file')
      this.data.append('file', this.f, this.f.name);
      this.http.post(`https://server-pmnj.onrender.com/api/uploaddata?f=${i}`, this.data)
      .subscribe( (rpn: any) =>{
        if(rpn['valid']){
          this.arr = rpn['data']
          this.loader[0] = false
          this.fdata.file = true
        }
        else{
          alert("File doesn't contain required fields!")
        }

      this.loader[0] = false
      console.log(rpn)
    } )
    }
    else{
      this.loader[1] = true
      this.data.delete('url')
      this.data.append('url', this.url);
      this.http.post(`https://server-pmnj.onrender.com/api/uploaddata?f=${i}`, this.data)
      .subscribe( (rpn: any) =>{
        alert(rpn['valid'])
        if(rpn['valid']){
          this.arr = rpn['data']
          this.loader[1] = false
          this.fdata.file = true
        }
        else{
          alert("File doesn't contain required fields!")
        }
      this.loader[1] = false
      console.log(rpn)
    } )
    }
    
    
  }

  validate(): void{
    this.submit = true
    if(this.fdata.file == true && this.fdata.target != '' && this.fdata.ti != '' && this.fdata.ti != null){
      this.forecast()
    }
    else{
      
    }

  }

  forecast():void{

    if(this.storage.popLocal('mail')){
      this.mail = this.storage.popLocal('mail')
    }
    else{
      this.mail = this.storage.popSession('mail')
    }

    this.fbtnLoader = true
    this.http.post(`https://server-pmnj.onrender.com/api/forecast?email=${this.mail}&target=${this.fdata.target}&f=0&count=${this.timePeriod(this.fdata.ti, this.fdata.tc)}`, this.data)
      .subscribe( (rpn: any) =>{
        this.fbtnLoader = false
        this.dataTransfer.pushPredData(rpn)
        this.storage.pushLocal('forecast', 1) 
        console.log(rpn)
        this.route.navigate(['/dashboard'])
    } )
  }

  timePeriod(x: string, y: any): any{
    if(x[0]=='W'){
      return 7*parseInt(y)
    }
    else if(x[0]=='M'){
      return 30*parseInt(y)
    }
    else{
      return 365*parseInt(y)
    }
  }
}
