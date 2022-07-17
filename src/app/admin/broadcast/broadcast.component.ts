import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import Fuse from 'fuse.js';
import { DataProvider } from 'src/app/providers/data.provider';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { DatabaseService } from 'src/app/services/database.service';
import { NewBroadcastComponent } from './new-broadcast/new-broadcast.component';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.scss'],
})
export class BroadcastComponent implements OnInit {
  broadcasts: any[];
  filteredBroadcasts: any[];
  currentBroadcast: number = -1;
  fileInput: any;
  alertify: any;

  constructor(
    private databaseService: DatabaseService,
    public broadcastService: BroadcastService,
    public dialog: MatDialog,
    private dataProvider:DataProvider,
    private activateRoute:ActivatedRoute
  ) {
    this.activateRoute.queryParams.subscribe((data:any)=>{
      console.log(data);
      // if(data.openModal){
      //   this.currentBroadcast = data.id;
      // }
      if (data.openModal==="true"){
        this.openBroadcast();
      }
    })
  }

  ngOnInit(): void {
    this.dataProvider.headerButtonActions.subscribe((action: any) => {
      if (action === 'newBroadCast') {
        this.openBroadcast();
      }
    })
    this.databaseService.getBroadcasts().then((docs: any) => {
      this.broadcasts = [];
      docs.forEach((doc: any) => {
        this.broadcasts.push({ id: doc.id, ...doc.data() });
      });
      this.filteredBroadcasts = this.broadcasts;
    });
  }
  
  ngAfterViewInit(): void {
    const broadcastSearchInput = document.getElementById(
      'broadcast-search-input'
    ) as HTMLInputElement;
    if (broadcastSearchInput) {
      broadcastSearchInput.oninput = () => {
        const query = broadcastSearchInput.value.trim();
        if (query.length > 0) {
          const options = { keys: ['subject', 'text'] };
          const fuse = new Fuse(this.broadcasts, options);
          const results = fuse.search(query);
          this.filteredBroadcasts = [];
          results.forEach((result: any) => {
            this.filteredBroadcasts.push(result.item);
          });
        } else {
          this.filteredBroadcasts = this.broadcasts;
        }
      };
    }
  }

  openBroadcast(){
    const dialogRef = this.dialog.open(NewBroadcastComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  formatText(text: string): string {
    const maxCharacters = 70;
    if (text.length <= maxCharacters) {
      return text;
    }
    return `${text.substring(0, maxCharacters)}...`;
  }

  getDate(timestamp: Timestamp): string {
    const date = timestamp.toDate();
    return `${
      [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ][date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }

  getTime(timestamp: Timestamp): string {
    const date = timestamp.toDate();
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  resendBroadcast(broadcastIndex: number): void {
    this.broadcastService.setBroadcast(this.broadcasts[broadcastIndex]);
  }
}
