import { Component, Input, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() active: string = '';

  constructor(public dataProvider: DataProvider, public authService: AuthenticationService) { }

  ngOnInit(): void {
  }

}
