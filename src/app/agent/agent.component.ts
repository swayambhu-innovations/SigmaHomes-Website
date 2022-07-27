import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DataProvider } from '../providers/data.provider';
import { AlertsAndNotificationsService } from '../services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss'],
})
export class AgentComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  currentPanel: string = 'Panel';
  showingPropertyPage: boolean = false;
  showingResponsePage: boolean = false;
  breakpoint: number = 1000;
  largeScreen: boolean = window.innerWidth > this.breakpoint;
  showSidebar: boolean = false;

  @ViewChild('viewAsInput') viewAsInput: ElementRef;

  constructor(
    private router: Router,
    public dataProvider: DataProvider,
    private alertify: AlertsAndNotificationsService
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        const url = this.router.url;
        const urlArr = url.split('/');
        if (urlArr.includes('properties')) {
          this.currentPanel = 'Properties';
          this.showingPropertyPage =
            urlArr.indexOf('properties') != urlArr.length - 1;
        } else if (urlArr.includes('responses')) {
          this.currentPanel = 'Responses';
          this.showingResponsePage =
            urlArr.indexOf('responses') != urlArr.length - 1;
        } else {
          const panel = urlArr[urlArr.length - 1].split('?')[0];
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

  ngOnInit(): void {
    this.dataProvider.headerButtonActions.subscribe((action) => {
      if (action === 'table') {
        this.setViewAs('table');
      }
      if (action === 'cards') {
        this.setViewAs('cards');
      }
    });
  }

  emitButtonAction(
    action:
      | 'newBroadCast'
      | 'importLead'
      | 'exportLead'
      | 'importCustomer'
      | 'exportCustomer'
      | 'importProperty'
      | 'exportProperty'
      | 'importResponses'
      | 'exportResponses'
      | 'table'
      | 'cards'
  ) {
    this.dataProvider.headerButtonActions.next(action);
    if (action === 'importLead') {
      this.fileInput.nativeElement.click();
      this.fileInput.nativeElement.addEventListener('change', (data: any) => {
        console.log(data);
        if (
          data.target.files.length == 1 &&
          (data.target.files[0].type == 'text/csv' ||
            data.target.files[0].type ==
              'text/csvapplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            data.target.files[0].type == 'application/vnd.ms-excel' ||
            data.target.files[0].type ==
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        ) {
          this.dataProvider.importExportFileActions.next({
            data: data.target.files,
            type: 'importLead',
          });
        } else {
          this.alertify.presentToast('No file inserted', 'error');
        }
      });
    }
  }

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
