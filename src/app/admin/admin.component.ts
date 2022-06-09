import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  currentPanel: string = 'Panel';
  showingPropertyPage: boolean = false;
  showingResponsePage: boolean = false;

  breakpoint: number = 1000;
  largeScreen: boolean = window.innerWidth > this.breakpoint;
  showSidebar: boolean = false;

  @ViewChild('viewAsInput') viewAsInput: ElementRef;

  constructor(private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        const url = this.router.url;
        const urlArr = url.split('/');
        if (urlArr.includes('properties')) {
          this.currentPanel = 'Properties';
          this.showingPropertyPage = urlArr.indexOf('properties') != urlArr.length - 1;
        }
        else if (urlArr.includes('responses')) {
          this.currentPanel = 'Responses';
          this.showingResponsePage =
            urlArr.indexOf('responses') != urlArr.length - 1;
        } else {
          const panel = urlArr[urlArr.length - 1];
          const panelWords = panel.split('-');
          panelWords.forEach((word, index) => {
            panelWords[index] =
              word.charAt(0).toUpperCase() + word.substring(1);
          });
          this.currentPanel = panelWords.join(' ');
        }
      }
    });
  }

  ngOnInit(): void {}

  onWindowResize() {
    this.largeScreen = window.innerWidth > this.breakpoint;
    document.documentElement.style.setProperty(
      '--overlay-width',
      !this.largeScreen && this.showSidebar ? '100%' : '0%'
    );
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
    document.documentElement.style.setProperty(
      '--overlay-width',
      !this.largeScreen && this.showSidebar ? '100%' : '0%'
    );
  }

  getViewAs() {
    return localStorage.getItem('view-as') || 'cards';
  }

  setViewAs(value: 'cards' | 'table') {
    this.viewAsInput.nativeElement.value = value;
    localStorage.setItem('view-as', value);
  }
}
