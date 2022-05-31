import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {
  private recipients: string[] = [];
  private broadcast: any;

  constructor() { }

  setRecipients(recipients: any[]) {
    this.recipients = recipients;
  }

  getRecipients() {
    return this.recipients;
  }

  setBroadcast(broadcast: any) {
    this.broadcast = broadcast;
  }

  getBroadcast() {
    return this.broadcast;
  }

  sendBroadcast(broadcast: any) {}
}
