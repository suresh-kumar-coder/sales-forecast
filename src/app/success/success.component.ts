import {  Component, OnDestroy, OnInit } from '@angular/core';
import anime from 'animejs';
import { RouteControlService } from '../service/router-control/route-control.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit, OnDestroy{
  tl = anime.timeline({
    autoplay: true,
    loop: false,
  });

  constructor(public rc: RouteControlService, private route: Router){

  }

  ngOnInit(): void {
    console.log(this.rc.flag)
    if(!(this.rc.flag.regToSuccess || this.rc.flag.logToSuccess)){
      this.route.navigate(['/signup'])
    }

    this.tl
      .add({
        targets: '.success',
        scale: [0.001, 1],
        rotate: [100, 360],
        opacity: [0.001, 1],
        duration: 1000
      },)
      .add({
        targets: '.checkmark',
        duration: 500,
        easing: 'easeInOutSine',
        strokeDashoffset: [anime.setDashoffset, 0],
      }, 200)
      .add({
        targets: '.line1',
        transformOrigin: ['50% 50% 0px', '50% 50% 0px'],
        opacity: {
          value: [0, 1],
          delay: 50,
        },
        scale: [0.000, 1],
        duration: 1000
      }, 400)
      .add({
        targets: '.line2',
        transformOrigin: ['50% 50% 0px', '50% 50% 0px'],
        opacity: {
          value: [0, 1],
          delay: 50,
        },
        scale: [0.001, 1],
        duration: 1000
      }, 300)
      .add({
        targets: '.line3',
        transformOrigin: ['50% 50% 0px', '50% 50% 0px'],
        opacity: {
          value: [0, 1],
          delay: 50,
        },
        scale: [0.001, 1],
        duration: 1000
      }, 400)
      .add({
        targets: '.line4',
        transformOrigin: ['50% 50% 0px', '50% 50% 0px'],
        opacity: {
          value: [0, 1],
          delay: 50,
        },
        scale: [0.001, 1],
        duration: 1000
      }, 400)
      .add({
        targets: '.line5',
        transformOrigin: ['50% 50% 0px', '50% 50% 0px'],
        opacity: {
          value: [0, 1],
          delay: 50,
        },
        scale: [0.001, 1],
        duration: 1000
      }, 300)
      .add({
        targets: '.line6',
        transformOrigin: ['50% 50% 0px', '50% 50% 0px'],
        opacity: {
          value: [0, 1],
          delay: 50,
        },
        scale: [0.001, 1],
        duration: 1000
      }, 400)
      .add({
        targets: '.line7',
        transformOrigin: ['50% 50% 0px', '50% 50% 0px'],
        opacity: {
          value: [0, 1],
          delay: 50,
        },
        scale: [0.001, 1],
        duration: 1000
      }, 300)
      .add({
        targets: '.line8',
        transformOrigin: ['50% 50% 0px', '50% 50% 0px'],
        opacity: {
          value: [0, 1],
          delay: 50,
        },
        scale: [0.001, 1],
        duration: 1000
      }, 400)

      .add({
        targets: ['.line1','.line2','.line3','.line4','.line5','.line6','.line7','.line8'],
        opacity: [1, 0.5],
        duration: 300,
        easing: 'easeInSine'
      },'-=300')

      .add({
        targets: ['.success'],
        opacity: [1, 1],
        delay: 200,
        duration: 300,
        easing: 'easeInSine',
        endDelay: 500
      },'-=300')
      this.tl.play()
  }
  ngOnDestroy(): void {
      this.rc.flag.regToSuccess = false
      this.rc.flag.logToSuccess = false
  }
}
