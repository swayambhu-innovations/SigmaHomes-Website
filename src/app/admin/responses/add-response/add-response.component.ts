import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-response',
  templateUrl: './add-response.component.html',
  styleUrls: ['./add-response.component.scss']
})
export class AddResponseComponent implements OnInit {
  properties:any[] = []
  customers:any[] = []
  leads:any[] = []
  phases:any[] = [
    {
      value:1,
      label:'Query'
    },
    {
      value:2,
      label:'Visitation'
    },
    {
      value:3,
      label:'Negotiation'
    },
    {
      value:4,
      label:'Legalization'
    },
    {
      value:5,
      label:'Closure'
    },
  ]
  phasesNotes:FormGroup = new FormGroup({});
  notesFieldsControls:any[] = [];
  addResponseForm:FormGroup = new FormGroup({
    property: new FormControl(null, Validators.required),
    customer: new FormControl(null, Validators.required),
    lead: new FormControl(null, Validators.required),
    phase: new FormControl(null, Validators.required),
    phaseNotes:this.phasesNotes
  })
  @Output() addResponse:EventEmitter<any> = new EventEmitter<any>()
  constructor(private databaseService:DatabaseService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.databaseService.getAllProjectsPromise().then((docs:any)=>{
      docs.forEach((element:any) => {
        this.properties.push({...element.data(), id: element.id})
      });
    })
    this.databaseService.getCustomersPromise().then((docs:any)=>{
      docs.forEach((element:any) => {
        this.customers.push({...element.data(), id: element.id})
      });
    });
    this.databaseService.getLeadsPromise().then((data:any)=>{
      data.forEach((element:any) => {
        this.leads.push({...element.data(), id: element.id})
      });
    })

  }

  genFields():any[]{
    this.notesFieldsControls = []
    this.phasesNotes.controls = {}
    const num = this.addResponseForm.value.phase;
    
    for(let i = 0; i < num; i++){
      this.notesFieldsControls.push({name:`phase${i}`,index:i})
      this.phasesNotes.addControl(`phase${i}`, new FormControl(null, Validators.required))
    }
    // console.log(this.notesFieldsControls)
    return this.notesFieldsControls;
  }

  submit(){
    if(this.addResponseForm.valid){
      let notes:any = {}
      Object.keys(this.addResponseForm.value.phaseNotes).forEach((key:string)=>{
        notes[key] = [{
          note:this.addResponseForm.value.phaseNotes[key],
          date:new Date()
        }]
      })
      this.addResponse.emit({
        property:this.properties.filter((property:any)=>property.id === this.addResponseForm.value.property)[0],
        customer:this.customers.filter((customer:any)=>customer.id === this.addResponseForm.value.customer)[0],
        lead:this.leads.filter((lead:any)=>lead.id === this.addResponseForm.value.lead)[0],
        phase:this.addResponseForm.value.phase,
        phaseNotes:notes
      })
      this.addResponseForm.reset()
      this.dialog.closeAll();
    }
  }
}
