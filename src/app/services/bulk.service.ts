import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { AlertsAndNotificationsService } from './uiService/alerts-and-notifications.service';


@Injectable({
  providedIn: 'root'
})
export class BulkService {

  constructor(private alertify:AlertsAndNotificationsService) { }
  
  async readCsv(file:File){
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    return new Promise(resolve => fileReader.addEventListener('load',()=>{
      let arrayBuffer = fileReader.result;
      if (arrayBuffer !=null && typeof arrayBuffer !== 'string'){
        let data = new Uint8Array(arrayBuffer);
        let workbook = XLSX.read(data, {type: 'array'});
        let first_sheet_name = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[first_sheet_name];
        let json = XLSX.utils.sheet_to_json(worksheet,{header:1});
        resolve(json);
      } else {
        this.alertify.presentToast("File is not valid",'error');
        resolve(false);
      }
    }))
  }
}
