import { Injectable } from '@angular/core';
import { DataProvider } from '../providers/data.provider';
import { AlertsAndNotificationsService } from './uiService/alerts-and-notifications.service';

@Injectable({
  providedIn: 'root',
})
export class CSVService {
  constructor(
    private alertService: AlertsAndNotificationsService,
    private dataProvider: DataProvider
  ) {}

  private records: any[] = [];

  loadRecords(file: any): void {
    if (file.name.endsWith('.csv')) {
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = () => {
        this.dataProvider.pageSetting.blur = true;

        const data = reader.result;
        const dataArr = (<string>data).split(/\r\n|\n/);
        const headers = (<string>dataArr[0]).split(',');

        for (var i = 1; i < dataArr.length; i++) {
          const dataRecord = (<string>dataArr[i]).split(',');
          const record: any = {};

          if (dataRecord.length >= headers.length) {
            var recordBlank = true;
            for (var j = 0; j < headers.length; j++) {
              const value = dataRecord[j].trim();
              if (value !== '') {
                recordBlank = false;
              }
              record[headers[j]] = value;
            }
            if (!recordBlank) {
              this.records.push(record);
            }
          }
        }

        this.dataProvider.pageSetting.blur = false;
      };

      reader.onerror = () => {
        this.alertService.presentToast(
          'An error occured trying to load the file.',
          'error'
        );
      };
    } else {
      this.alertService.presentToast(
        'Please upload a valid .csv file.',
        'error'
      );
    }
  }

  getRecords(): any[] {
    return this.records;
  }

  export(records: any[], filename: string) {
    this.dataProvider.pageSetting.blur = true;

    var data = 'data:text/csv;charset=utf-8,';
    records.forEach((record) => {
      let row = record.join(',');
      data += row + '\r\n';
    });

    const link = document.createElement('a');
    link.href = encodeURI(data);
    link.download = `${filename}.csv`;
    document.body.appendChild(link); // Required for Firefox
    link.click();

    this.dataProvider.pageSetting.blur = false;
  }
}
