import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts'
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../service/storage/storage.service';
import { RouteControlService } from '../service/router-control/route-control.service';
import { color } from 'highcharts';
import { style } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  constructor( private route: Router, private storage: StorageService,
    private http: HttpClient, private rc: RouteControlService){

  }

  chart: any

  mail: string = this.storage.popLocal('mail') != null ? this.storage.popLocal('mail') : this.storage.popSession('mail')

  d1data: Array<any> = []
  d2data: Array<any> = []

  sec = 3

  showContent: boolean = true

  loader: boolean = false

  stat: any = {

  }

  weekly_f: boolean = false

  monthly_f: boolean = false

  week_sale: Array<any> = []
  week_error: Array<any> = []

  m_sale: Array<any> = []
  m_error: Array<any> = []

  daily: Array<any> = []

  ngOnInit(): void {
    this.rc.currentPage = 'd'
    if(this.storage.popSession('token')==null && this.storage.popLocal('token')==null){
      this.rc.flag.dashToAd = true
      this.route.navigate(['/accessdenied'])
    }

    if(this.storage.popLocal('forecast')!= '1' || this.storage.popSession('forecast')== '1'){
      this.showContent = false
      this.counter()
    }
    else{
      this.showContent = true
      this.loader = true
    this.http.get(`https://server-pmnj.onrender.com/api/getforecastdata?email=${this.mail}`)
    .subscribe( (data: any) => {
        for(let i=0; i< data['data']['pred'].length; i++){
          if(i< data['data']['actual'].length){
            this.d1data.push([new Date(data['data']['actual'][i]['ds']).getTime(), data['data']['actual'][i]['y']])
          }
          else{

          }
          if(i<7){
            this.daily.push([data['data']['daily'][i]['ds'].split('00')[0], data['data']['daily'][i]['y'], data['data']['daily'][i]['e']])
          }
          this.d2data.push([new Date(data['data']['pred'][i]['ds']).getTime(), data['data']['pred'][i]['y']])
        }
        this.weekly_f = data['data']['weekly_f']
        this.week_sale = data['data']['w_yhat']
        this.week_error = data['data']['w_e']
        this.monthly_f = data['data']['monthly_f']
        this.m_sale = data['data']['m_yhat']
        this.m_error = data['data']['m_e']
        if(this.week_sale.length >4 ){
          this.week_sale = this.week_sale.slice(0,4)
          this.week_error = this.week_error.slice(0,4)
        }
        this.stat = data['data']['stats']
        this.createChart()
        this.loader = false
    } )
    }
    
  }
 
  

  counter(): void{
    const cd = setInterval(() => {
      this.sec--;
      if(this.sec==0){
        clearInterval(cd)
        this.route.navigate(['/forecast'])
      }
    },1000)
  }

  valConversion(val: any): any{
    if(val>1000000){
      return Number((val/1000000).toFixed(2)) + "M"
    }
    else if(val>1000){
      return Number((val/1000).toFixed(2)) + 'K'
    }
    else{
      return Number(val.toFixed(2))
    }
  }

  
createChart(): void{
  this.chart = new Chart({
    chart: {
      type: 'line',
      backgroundColor: 'rgba(13, 109, 253, 0.05)',
    },
    title: {
      text: 'Sales Prediction',
      style: {
        fontSize: '28px',
        color: '#003078',
        fontWeight: "600"
      }
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: true
    },
    plotOptions: {
      line: {
        lineWidth: 2
        
      }
    },
    xAxis: {
      type: 'datetime',
      
    },
    yAxis: {
      title: {
        text: 'Sale'
      }
    },
    series: [
      {
        name: 'Actual',
        data: this.d1data,
        
      } as any,
      {
        name: 'Prediction',
        data: this.d2data.slice(0,this.d1data.length)
      } as any,
      {
        name: 'Forecast',
        color: 'orange',
        data: this.d2data.slice(this.d1data.length),
        
      } as any
    ]
  });
}

}
