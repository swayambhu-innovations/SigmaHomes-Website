import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
declare const UIkit:any;

@Component({
  selector: 'app-lead-center',
  templateUrl: './lead-center.component.html',
  styleUrls: ['./lead-center.component.scss']
})
export class LeadCenterComponent implements OnInit, OnDestroy {
  leads:any[] = [];
  editMode:boolean = false;
  editLeadsValue:any;
  currentLeadId:string = '';
  leadsSubscription:Subscription = Subscription.EMPTY;
  constructor(private databaseService:DatabaseService,private alertify:AlertsAndNotificationsService,private dataProvider:DataProvider) { }
  leadForm:FormGroup = new FormGroup({
    name:new FormControl('test',[Validators.required]),
    budget:new FormControl('test',[Validators.required]),
    interest:new FormControl('test',[Validators.required]),
    preferredLocality:new FormControl('test',[Validators.required]),
    job:new FormControl('test',[Validators.required]),
    salary:new FormControl('test',[Validators.required]),
    otherPreferences:new FormControl('test',[Validators.required]),
    email:new FormControl('test@test.com',[Validators.required,Validators.email]),
    phone:new FormControl('1234567890',[Validators.required]),
    address:new FormControl('test',[Validators.required]),
    city:new FormControl('test',[Validators.required]),
    state:new FormControl('test',[Validators.required]),
    pinCode:new FormControl('test',[Validators.required]),
    aadhaar:new FormControl('test',[Validators.required]),
    panNo:new FormControl('test',[Validators.required]),
    customerDob:new FormControl('2022-04-12',[Validators.required]),
    customerAnniversary:new FormControl('2022-04-12',[Validators.required]),
  })
  ngOnInit(): void {
    this.leadsSubscription = this.databaseService.getLeads().subscribe(data=>{
      this.leads = [];
      data.forEach((element:any) => {
        let data = element.data();
        data.id = element.id;
        this.leads.push(data);
      })
    })
  }
  edit(lead:any){
    this.editMode = true;
    this.currentLeadId = lead.id;
    this.leadForm.patchValue(lead);
    document.getElementById('add-lead-modal')?.addEventListener('hidden',()=>{
      this.editMode = false;
      this.currentLeadId = '';
      this.editLeadsValue = undefined;
      this.leadForm.reset();
    })
    UIkit.modal(document.getElementById('add-lead-modal')).show()
  }
  delete(lead:any){
    if(lead.id && confirm('Are you sure you want to delete this lead?')){
      this.dataProvider.pageSetting.blur = true;
      this.databaseService.deleteLead(lead.id).then(()=>{
        this.dataProvider.pageSetting.blur = false;
        this.alertify.presentToast('Lead Deleted Successfully','info');
      }).catch((error)=>{
        this.alertify.presentToast('Error Occurred: '+error,'error');
      })
    }
  }
  editLead(leadId:string){
    if (this.leadForm.valid){
      this.dataProvider.pageSetting.blur = true;
      this.databaseService.updateLead(leadId,this.leadForm.value).then(()=>{
        this.alertify.presentToast('Lead Updated Successfully','info');
        this.leadForm.reset();
        this.editMode = false;
        UIkit.modal(document.getElementById('add-lead-modal')).hide()
        this.dataProvider.pageSetting.blur = false;
      }).catch((error)=>{
        this.dataProvider.pageSetting.blur = false;
        this.alertify.presentToast('Error Occurred: '+error,'error');
      })
    } else {
      this.alertify.presentToast('Please Fill All The Fields','error');
    }
  }
  addLead(){
    console.log(this.leadForm.value);
    if(this.leadForm.valid){
      this.dataProvider.pageSetting.blur = true;
      this.databaseService.addLead(this.leadForm.value).then(()=>{
        this.alertify.presentToast('Lead Added Successfully','info');
        this.leadForm.reset();
        UIkit.modal(document.getElementById('add-lead-modal')).hide()
        this.dataProvider.pageSetting.blur = false;
      }).catch((error)=>{
        this.dataProvider.pageSetting.blur = false;
        this.alertify.presentToast('Error Occurred: '+error,'error');
      })
    } else {
      this.alertify.presentToast('Please Fill All The Fields','error');
    }
  }
  ngOnDestroy(): void {
    this.leadsSubscription.unsubscribe();
  }
}
