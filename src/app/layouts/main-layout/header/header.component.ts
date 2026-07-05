// import { Component, OnInit } from '@angular/core';
import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,  OnDestroy {

  ngOnInit() {
    // console.log('ngOnInit');
  }

  ngOnDestroy() {
    // console.log('ngOnDestroy');
  }

  
}