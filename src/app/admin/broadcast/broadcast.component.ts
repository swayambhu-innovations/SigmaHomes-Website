import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import Fuse from 'fuse.js';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.scss'],
})
export class BroadcastComponent implements OnInit {
  broadcasts: any[];
  filteredBroadcasts: any[];
  currentBroadcast: number = -1;

  constructor(
    private databaseService: DatabaseService,
    public broadcastService: BroadcastService
  ) {}

  ngOnInit(): void {
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
