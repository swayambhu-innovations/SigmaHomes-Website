import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataTransferService {
  private lead: any;

  setLead(lead: any) {
    this.lead = lead;
  }

  getLead() {
    return this.lead;
  }

  clearLead() {
    this.lead = null;
  }

  constructor() {}
}
