// import { Component, OnInit } from '@angular/core';
import {
  Component,
  OnInit,
  OnChanges,
  DoCheck,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit,
  OnChanges,
  DoCheck,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {

    constructor() {
    // console.log('Constructor');
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('ngOnChanges', changes);
  }

  ngOnInit() {
    // console.log('ngOnInit');
  }

  ngDoCheck() {
    // console.log('ngDoCheck');
  }

  ngAfterViewInit() {
    // console.log('ngAfterViewInit');
  }

  ngAfterViewChecked() {
    // console.log('ngAfterViewChecked');
  }

  isCollapsed = false;

    menuItems = [
    { label: 'Dashboard', icon: '🏠', route: '/dashboard' },
    { label: 'Bills', icon: '📄', route: '/bills' },
    { label: 'Users', icon: '👤', route: '/users' }
    ];

    toggleSidebar() {
        // console.log('clicked');
    this.isCollapsed = !this.isCollapsed;
    }

  ngOnDestroy() {
    // console.log('ngOnDestroy');
  }

  
}