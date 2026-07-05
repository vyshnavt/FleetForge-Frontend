// import { Component, OnInit } from '@angular/core';
import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit,  OnDestroy {

  ngOnInit() {
    // console.log('ngOnInit');
  }

  ngOnDestroy() {
    // console.log('ngOnDestroy');
  }

  
}