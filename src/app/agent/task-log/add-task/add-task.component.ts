import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor(private databaseService:DatabaseService,private alertify:AlertsAndNotificationsService,public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public type: string ) { }
  agents:any[] = [];
  properties:any[] = [];
  addTaskForm:FormGroup = new FormGroup({
    title:new FormControl('',[Validators.required]),
    body:new FormControl('',[Validators.required]),
    property:new FormControl('',[Validators.required]),
    agent:new FormControl('',[Validators.required]),
    stage:new FormControl('',[Validators.required]),
  });
  @Output() addTask:EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
    // alert(this.type)
    this.databaseService.getAllProjectsPromise().then((docs)=>{
      docs.forEach((doc)=>{
        this.properties.push({...doc.data(),id:doc.id});
      });
    })
    this.databaseService.getAllAgentsPromise().then((docs)=>{
      docs.forEach((doc)=>{
        this.agents.push(doc.data());
      });
      console.log(this.agents);
    });
  }
  verifyAndSubmit(){

    console.log(this.addTaskForm);
    if(this.addTaskForm.valid){
      let data = {
        title:this.addTaskForm.value.title,
        body:this.addTaskForm.value.body,
        date:new Date(),
        propertyName:this.addTaskForm.value.property.name,
        propertyPrice:this.addTaskForm.value.property.budget,
        assignedAgentImage:this.addTaskForm.value.agent.photoURL,
        assignedAgentName:this.addTaskForm.value.agent.displayName,
        assignedAgentId:this.addTaskForm.value.agent.userId,
        phase:this.addTaskForm.value.stage,
      }
      this.addTask.emit({task:data,type:this.type});
      this.dialog.closeAll()
    } else {
      this.alertify.presentToast('Please fill all the required fields','error');
    }
  }
}
