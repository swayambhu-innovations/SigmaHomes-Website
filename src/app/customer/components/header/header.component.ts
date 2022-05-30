import { Component, Input, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() positionAbsolute: boolean = false;
  
  breakpoint: number = 950;

  largeScreen: boolean = window.innerWidth > this.breakpoint;
  onWindowResize() {
    this.largeScreen = window.innerWidth > this.breakpoint;
  }

  constructor(
    public dataProvider: DataProvider,
    public authService: AuthenticationService
  ) {}

  ngOnInit(): void {}
}
